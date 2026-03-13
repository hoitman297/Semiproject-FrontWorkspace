$(document).ready(function () {
    /* [1. 공통: 드롭다운 메뉴 제어] */
    const $mainMenu = $('#mainMenu');

    $mainMenu.on('click', function (e) {
        $(this).toggleClass('show');
        e.stopPropagation();
    });

    $(window).on('click', function () {
        if ($mainMenu.hasClass('show')) {
            $mainMenu.removeClass('show');
        }
    });

    /* [2. 공통: 탭 메뉴 전환 (메인보드 & 영웅상세)] */
    // .tab-item(메인)과 .d-tab(영웅상세) 모두 처리
    $('.tab-item, .d-tab').on('click', function () {
        // 1. 모든 .d-tab에서 active 클래스 제거 (가장 확실함)
        $('.d-tab').removeClass('active');
        // 2. 클릭한 요소에만 active 클래스 추가
        $(this).addClass('active');
    });


    /* [3. 상자 시뮬레이션 로직] */
    // 데이터 관리 객체
    let gachaData = { total: 0, s: 0, a: 0, b: 0 };

    // 뽑기 함수를 전역(window)에 할당하여 HTML의 onclick에서 접근 가능하게 함
    window.gacha = function (count) {
        let lastItem = "";
        const $display = $('#display');

        for (let i = 0; i < count; i++) {
            gachaData.total++;
            let rand = Math.random() * 100;

            if (rand < 2) {
                gachaData.s++;
                lastItem = "✨ S등급 획득! ✨";
            } else if (rand < 15) {
                gachaData.a++;
                lastItem = "💎 A등급 획득";
            } else {
                gachaData.b++;
                lastItem = "📦 B등급 획득";
            }
        }

        if (count === 1) {
            $display.text(lastItem);
            $display.css('color', lastItem.includes("S등급") ? "#f59e0b" : "#475569");
        } else {
            $display.text("10회 연속 뽑기 완료!");
            $display.css('color', "#475569");
        }
        updateUI();
    };

    // UI 업데이트 함수
    function updateUI() {
        $('#total').text(gachaData.total);
        $('#s-count').text(gachaData.s);
        $('#a-count').text(gachaData.a);
        $('#b-count').text(gachaData.b);
    }

    // 초기화 함수
    window.resetStats = function () {
        gachaData = { total: 0, s: 0, a: 0, b: 0 };
        $('#display').text("초기화되었습니다.");
        updateUI();
    };
});