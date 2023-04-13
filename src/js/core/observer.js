let currentObserver = null;
const debounceFrame = (callback, delay = -1) => {
    // 한 프레임에 한번만 렌더링되도록 한다.
    let currentCallback = delay;
    return () => {
        // 현재 등록된 콜백이 있을 경우 취소하고 1프레임 뒤에 새로운 콜백을 등록한다.
        cancelAnimationFrame(currentCallback);
        currentCallback = requestAnimationFrame(callback);
    }
}
export const observe = observer => {
    // 현재 옵저버를 등록한다.
    currentObserver = debounceFrame(observer);
    observer();
    currentObserver = null;
}
export const observable = obj => {
    const observerMap = Object.keys(obj).reduce((map, key) => {
       map[key] = new Set();
       return map;
    });

    return new Proxy(obj, {
        get: (target, key) => {
            // 현재 옵저버를 등록한 뒤, 해당하는 프로퍼티의 값을 반환한다.
            if(currentObserver) observerMap[key].add(currentObserver);
            return target[key];
        },
        set: (target, key, value) => {
            // 값이 동일하면 업데이트하지 않는다.
            if(target[key] === value) return true;
            if(JSON.stringify(target[key]) === JSON.stringify(value)) return true;

            // 값이 변경되면 옵저버를 실행한다.
            target[key] = value;
            observerMap[key].forEach(observer => observer());
            return true;
        }
    });
}