export default class Component{
    $target;
    $props; // 부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메소드를 넘겨주기 위해서
    $state;
    constructor($target, $props = {}) {
        this.$target = $target;
        this.$props = $props;
        this.setUp();
        this.setEvent();
        this.mounted();
    }
    setUp () {
        // 컴포넌트가 마운트되기 전에 호출
        // 컴포넌트를 초기화하는데 사용한다.
    }
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
    setEvent () {
        // 컴포넌트의 이벤트를 설정한다.
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
    setState = (newState) => {
        // 컴포넌트의 상태를 변경한다.
        this.$state = {...this.$state, ...newState};
        this.render();
    }
    addEvent (eventType, selector, callback) {
        // 컴포넌트의 이벤트를 등록한다.
        this.$target.addEventListener(eventType, event => {
            if(!event.target.closest(selector)) return false;
            callback(event);
        });
    }
}