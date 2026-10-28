"""Печать трассы Quint по шагам: на каждом шаге — только изменившиеся переменные.

  quint run specs/<модель>.qnt --main=fixed --invariant=<свойство> --mbt --out-itf=/tmp/t.json
  python3 tools/show.py /tmp/t.json            # все переменные
  python3 tools/show.py /tmp/t.json -x log     # без длинных (через запятую)
"""
import json
import sys


def val(x):
    if isinstance(x, dict):
        if '#map' in x:
            return {fmt(val(k)): val(v) for k, v in x['#map']}
        if '#set' in x:
            return sorted((val(e) for e in x['#set']), key=fmt)
        if '#tup' in x:
            return tuple(val(e) for e in x['#tup'])
        if '#bigint' in x:
            return int(x['#bigint'])
        if x.get('tag') == 'Some':  # nondet-выбор
            return val(x['value'])
        if x.get('tag') == 'None':
            return None
        if 'tag' in x and 'value' in x:  # вариант типа-перечня
            return x['tag'] if x['value'] in ({'#tup': []}, None) else f"{x['tag']}({fmt(val(x['value']))})"
        return {k: val(v) for k, v in x.items()}
    return x


def fmt(v):
    if isinstance(v, dict):
        return '{' + ', '.join(f'{k}: {fmt(x)}' for k, x in v.items()) + '}'
    if isinstance(v, list):
        return '{' + ', '.join(fmt(x) for x in v) + '}'
    if isinstance(v, tuple):
        return '(' + ', '.join(fmt(x) for x in v) + ')'
    return json.dumps(v, ensure_ascii=False) if isinstance(v, str) else str(v)


def main():
    args = sys.argv[1:]
    skip = set(args[args.index('-x') + 1].split(',')) if '-x' in args else set()
    trace = json.load(open(args[0]))
    prev = {}
    for i, state in enumerate(trace['states']):
        cur = {k.split('::')[-1]: val(v) for k, v in state.items() if k != '#meta'}
        act = cur.pop('mbt::actionTaken', None) or cur.pop('actionTaken', None)
        picks = cur.pop('mbt::nondetPicks', None) or cur.pop('nondetPicks', None)
        for k in [k for k in cur if k.startswith('mbt::')]:
            cur.pop(k)
        head = f'{i:>2}'
        if act:
            chosen = {k: v for k, v in (picks or {}).items() if v not in ([], {}, None)}
            head += f' {act}' + (f' {fmt(chosen)}' if chosen else '')
        diff = {k: v for k, v in cur.items() if k not in skip and prev.get(k) != v}
        print(head)
        for k, v in diff.items():
            print(f'     {k} = {fmt(v)}')
        prev = cur


if __name__ == '__main__':
    main()
