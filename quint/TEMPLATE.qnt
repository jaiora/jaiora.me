// Заготовка модели — копировать в specs/<подсистема>.qnt. Правила: quint/PRACTICES.md; run.sh проверяет каждое.
// <Подсистема>: <что моделируем> (<требование / баг-репорт>).
// Код: <ветка> <коммит> (<дата>) — <файл>: <функция> — <что делает, где await>.
// Требование: <дословно или близко к источнику>.
// current — код как есть. fixed — требование: <Код1> …, <Код2> … (правки за if (FIX …), рядом «было: …»).
// props: propA propB
// expect current: ❌ ✅
// witnesses: wA wB
// mutants: breakB→propB
// propB держится и в current — зубы от мутанта breakB.
// Необязательные (см. PRACTICES.md Р10, Р11):
//   // temporal: eventuallyX                 + // temporal mutants: name→eventuallyX
//   // options: a b  // option props: x y   + // expect opt_a: ✅ ❌   // expect opt_b: ❌ ✅
module template {

  const FIX: bool
  const MUT: str                 // "" — без порчи; иначе имя мутанта

  type Phase = Idle | Busy       // фазы — перечнем, не строкой

  // ── Мир (маленький: 2–3 значения на домен) ──
  pure val IDS = 1.to(2)

  // ── Состояние (каждой переменной — тип; призраки помечать «призрак:» и задавать НЕЗАВИСИМО от поля, которое проверяют) ──
  var x: int
  var want: int                  // призрак: чего хочет пользователь (nondet в своём действии)

  action init = all { x' = 0, want' = 0 }

  // ── Действия: одно действие = кусок кода между двумя await; окружение и отказы — отдельные действия ──
  // <Код1>: … Было: …
  action userWants(v: int): bool = all { want' = v, x' = x }
  action doIt: bool = all { x' = if (FIX and MUT != "breakB") want else x, want' = want }
  // отказ: перезапуск фона / закрыли вкладку / запись не удалась
  action crash: bool = all { x' = x, want' = want }
  // законный конец — чтобы трасса не обрывалась тупиком
  action stutter = all { x' = x, want' = want }

  action step = any {
    nondet v = IDS.oneOf()
    any { userWants(v), doIt, crash, stutter },
  }

  // ── Свойства: формулируют требование, а не пересказывают действие; and/or в правой части x' = (…) — в скобках ──
  val propA = x == 0 or x == want
  val propB = x >= 0

  // ── Свидетели: интересное состояние случается (в fixed > 0 % трасс) ──
  val wA = want != 0
  val wB = x != 0

  // ── Сценарии: короткие, по одному на находку; запрет — .fail() ──
  run doBugTest = init.then(userWants(1)).then(doIt).expect(x == 0)
  run doFixedTest = init.then(userWants(1)).then(doIt).expect(propA and x == 1)
}


module current {
  import template(FIX = false, MUT = "").*
}

module fixed {
  import template(FIX = true, MUT = "").*
}

module mut_breakB {
  import template(FIX = true, MUT = "breakB").*   // <одна порча>
}
