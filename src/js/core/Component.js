import { observable, observe } from "./observer.js";

export default class Component{
    $target; // 컴포넌트가 마운트되거나 렌더링되는 DOM 엘리먼트를 말한다. (= 컴포넌트 UI의 컨테이너)
    $props; // 부모 컴포넌트에서 전달되는 데이터, 메소드를 담은 객체. 전달받은 자식 컴포넌트는 이를 수정해선 안된다.
    $state; // 컴포넌트 내부 상태를 나타내는 객체. 이벤트에 응답하여 컴포넌트 자체에서 수정된 뒤 렌더링한다.
    constructor($target, $props = {}) {
        this.$target = $target;
        this.$props = $props;
        this.setUp();
    }
    setUp () {
        // 컴포넌트가 마운트되기 전에 호출
        // 컴포넌트를 초기화하는데 사용한다.
        this.$state = observable(this.initState());
        observe(() => {
            this.render();
            this.setEvent();
            this.mounted();
        });
    }
    initState () { return {}; }
    mounted () {
        // 컴포넌트가 마운트된 후에 동작한다.
    }
    template () {
        // 컴포넌트의 내용을 반환
        return '';
    }
    render () {
        // 컴포넌트를 렌더링한다.
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    addEvent (eventType, selector, callback) {
        // 컴포넌트의 이벤트를 추가한다.
        this.$target.addEventListener(eventType, event => {
            if(!event.target.closest(selector)) { return false; }
            callback(event);
            event.stopImmediatePropagation();
        });
    }

    setEvent () {
        // 컴포넌트의 모든 이벤트를 등록한다.
        // 모든 이벤트를 this.$target 에 등록하여 사용하면 된다. (이벤트 버블링)
        /* ex)
            const { deleteItem, toggleItem } = this.$props;

            this.addEvent('click', '.deleteBtn', ({target}) => {
              deleteItem(Number(target.closest('[data-seq]').dataset.seq));
            });

            this.addEvent('click', '.toggleBtn', ({target}) => {
              toggleItem(Number(target.closest('[data-seq]').dataset.seq));
            });
        */
    }
}