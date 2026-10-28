// Сайт jaiora.me и его политика конфиденциальности (требование Пс; Егор 2026-10-28: «Ты и код сам правь… Через
// qunit» — после разбора законов ЕС/США: шрифты от Google видят IP посетителя; в политике нет права на жалобу, основы
// передачи в другие страны и того, что данные ботов обрабатывает Jaiora).
// Код: main 6c41a35 (2026-10-28) — index.html: шрифты Manrope и JetBrains Mono — с fonts.googleapis.com /
//      fonts.gstatic.com (Google получает IP и браузер посетителя при каждом открытии); cookie и счётчиков нет;
//      src/data/privacy.ts: права без жалобы в надзорный орган, передача в другие страны без основы защиты, раздел
//      о Telegram относит к Telegram и «работу ботов». current — это.
// Требование: Пс1 открытие страницы не отдаёт данные посетителя никому, кроме размещения сайта (шрифты — с самого
//      сайта); Пс2 у сайта нет cookie и счётчиков посещений; Пс3 политика содержит все обязательные пункты: права
//      (включая жалобу в орган по защите данных), основу передачи в другие страны (договорные условия о защите
//      данных), то, что данные ботов Jaiora обрабатывает Jaiora; Пс4 всё, что политика обещает про сайт, — правда.
// current — код как есть. fixed — Пс1–Пс4 (правки за if (FIX …), рядом «было: …»).
// Мир: посетитель открывает страницы; хосты — сам сайт, размещение, сторонний шрифтовой сервис, счётчик.
// props: onlyHosting noTracking policyComplete promisesTrue
// expect current: ❌ ✅ ❌ ✅
// witnesses: wLoaded wTwice
// mutants: addAnalytics→noTracking dropComplaint→policyComplete promiseFonts→promisesTrue
// noTracking, promisesTrue держатся и в current — зубы от мутантов addAnalytics, promiseFonts.
module site_privacy {

  const FIX: bool
  const MUT: str

  type Host = Own | Hosting | FontsCdn | Analytics
  type Item = Rights | Complaint | TransfersBasis | BotsOurs | NoTracking | NoThirdPartyFonts

  // обязательные пункты политики (Пс3)
  pure val REQUIRED = Set(Rights, Complaint, TransfersBasis, BotsOurs, NoTracking)

  // что написано в политике (было: без жалобы, основы передачи и ботов)
  def policy: Set[Item] =
    if (not(FIX)) Set(Rights, NoTracking)
    else (if (MUT == "dropComplaint") Set(Rights, TransfersBasis, BotsOurs, NoTracking)
          else Set(Rights, Complaint, TransfersBasis, BotsOurs, NoTracking))
      .union(if (MUT == "promiseFonts") Set(NoThirdPartyFonts) else Set())

  // куда уходит запрос при открытии страницы (было: ещё и шрифтовой сервис)
  def pageHosts: Set[Host] =
    Set(Own, Hosting)
      .union(if (not(FIX) or MUT == "promiseFonts") Set(FontsCdn) else Set())
      .union(if (MUT == "addAnalytics") Set(Analytics) else Set())

  var requests: Set[Host]   // призрак: кому ушли данные посетителя
  var loads: int

  action init = all { requests' = Set(), loads' = 0 }
  action openPage: bool = all { loads < 3, requests' = requests.union(pageHosts), loads' = loads + 1 }
  action stutter = all { requests' = requests, loads' = loads }
  action step = any { openPage, stutter }

  // ── Свойства ──
  // Пс1. Данные посетителя — только размещению сайта
  val onlyHosting = requests.subseteq(Set(Own, Hosting))
  // Пс2. Счётчиков нет
  val noTracking = not(requests.contains(Analytics))
  // Пс3. В политике все обязательные пункты
  val policyComplete = REQUIRED.subseteq(policy)
  // Пс4. Обещания политики про сайт — правда
  val promisesTrue =
    (policy.contains(NoTracking) implies noTracking) and (policy.contains(NoThirdPartyFonts) implies onlyHosting)

  // ── Свидетели ──
  val wLoaded = loads >= 1
  val wTwice = loads >= 2

  // ── Сценарии ──
  run fontsBugTest = init.then(openPage).expect(requests.contains(FontsCdn) and not(onlyHosting) and not(policyComplete))
  run siteFixedTest = init.then(openPage).then(openPage).expect(onlyHosting and noTracking and policyComplete and promisesTrue)
}


module current {
  import site_privacy(FIX = false, MUT = "").*
}

module fixed {
  import site_privacy(FIX = true, MUT = "").*
}

module mut_addAnalytics {
  import site_privacy(FIX = true, MUT = "addAnalytics").*   // на сайт поставили счётчик посещений
}

module mut_dropComplaint {
  import site_privacy(FIX = true, MUT = "dropComplaint").*  // из политики пропало право на жалобу
}

module mut_promiseFonts {
  import site_privacy(FIX = true, MUT = "promiseFonts").*   // политика обещает «шрифты свои», а грузятся чужие
}
