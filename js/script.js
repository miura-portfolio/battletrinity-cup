// ---------------------------------------------
// Battle Trinity Cup - Frontend scripts
// 目的:
//  - トップページのみ簡易SPAとして動かし、個別ページは静的表示
//  - スライドショーとスムーズスクロールで体験を改善
//  - JSON-LD（Event）の保険注入で構造化データを欠落させない
// 設計方針:
//  - 依存は jQuery のみ（GitHub Pagesで扱いやすい）
//  - 既存HTML/CSSを変えず、読み込み順と履歴APIで軽量実装
// ---------------------------------------------

// headにEventのJSON-LDが無い場合に最低限の情報を補完
(function() {
  var hasEventJsonLd = !!document.querySelector('script[type="application/ld+json"]');
  if (!hasEventJsonLd) {
    // 例: https://.../battletrinity-cup/summer1.html -> rootは https://.../battletrinity-cup/
    var root = new URL('.', location.href).href;
    var ld = {
      "@context":"https://schema.org",
      "@type":"Event",
      "name":"バトルトリニティ 第三回サマーカップ",
      "startDate":"2025-07-26T22:00:00+09:00",
      "eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode",
      "eventStatus":"https://schema.org/EventScheduled",
      "location":{"@type":"VirtualLocation","url": root + "#news"},
      "description":"抽選会は 2025-07-19 22:00。エントリー期間は 06/06〜07/18。",
      "organizer":{"@type":"Organization","name":"バトルトリニティカップ運営"},
      "image":[ new URL('images/summer3.jpg', root).href ],
      "url": root
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  // トップページ判定: #home セクションの有無で切り分け（個別ページは静的）
  var isTop = !!document.getElementById('home');

  // === スライドショー（トップ共通ヒーロー領域のみ） ======================
  if (document.querySelector('.slideshow')) {
    var slideshowImages = [
      'images/summer1.jpg',
      'images/winter1.jpg',
      'images/summer2.jpg',
      'images/winter2.jpg'
    ];
    var currentImageIndex = 0;

    function updateSlideshow() {
      // フェード→差し替え→フェードの繰り返しで軽量に演出
      $('.slideshow').animate({ opacity: 0 }, 2000, function() {
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        $(this).css({
          'background-image': 'url("' + slideshowImages[currentImageIndex] + '")',
          'background-size': 'contain',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'opacity': '1'
        }).animate({ opacity: 1 }, 2000, function() {
          setTimeout(updateSlideshow, 4000); // 静止→次フェード
        });
      });
    }

    // 初期画像を即時適用（CLS対策にも寄与）
    $('.slideshow').css({
      'background-image': 'url("' + slideshowImages[0] + '")',
      'background-size': 'contain',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'opacity': '1'
    });
    setTimeout(updateSlideshow, 4000);
  }

  // === ここから簡易SPA（トップのみ有効） ==================================
  if (!isTop) {
    // 個別ページ（/summer1.html 等）は通常表示のまま
    return;
  }

  // 指定セクションの表示/非表示を切り替え
  function showSection(sectionId) {
    $('.section').hide();
    $('.nav-link').removeClass('active');

    // トップは、一覧系（home/events/winners/overview）を同時表示
    if (['home','events','winners','overview','news','entry'].includes(sectionId)) {
      if (['home','events','winners','overview'].includes(sectionId)) {
        $('#home,#events,#winners,#overview').show();
      } else {
        $('#' + sectionId).show();
      }
      $('.nav-link[data-section="' + sectionId + '"]').addClass('active');
    } else {
      // 不明なハッシュはトップ相当へフェイルセーフ
      $('#home,#events,#winners,#overview').show();
      $('.nav-link[data-section="home"]').addClass('active');
    }
  }

  // ナビクリック時: 履歴API + スムーズスクロール
  $(document).on('click', '.nav-link, .news-button.nav-link', function(e) {
    e.preventDefault();
    var sectionId = $(this).data('section');
    history.pushState({ sectionId: sectionId }, '', '#' + sectionId);
    showSection(sectionId);

    var headerHeight = $('header.fixed-header').outerHeight();
    $('html, body').animate({ scrollTop: $('#' + sectionId).offset().top - headerHeight }, 500);
  });

  // 戻る/進む対応: stateを参照して表示復元
  $(window).on('popstate', function(event) {
    var state = event.originalEvent.state;
    var sectionId = state && state.sectionId ? state.sectionId : (location.hash.replace('#','') || 'home');
    showSection(sectionId);

    var headerHeight = $('header.fixed-header').outerHeight();
    $('html, body').animate({ scrollTop: $('#' + sectionId).offset().top - headerHeight }, 500);
  });

  // 初期表示: ハッシュに応じて表示（未指定なら home 相当）
  var initialSection = location.hash.replace('#','') || 'home';
  showSection(initialSection);
});
