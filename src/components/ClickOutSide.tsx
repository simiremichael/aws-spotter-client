import React, { useRef, useEffect} from 'react';

function ClickOutSide(props: any) {

    const ref = useRef<HTMLDivElement>(null);
    const{onClickOutSide, children} = props
    
    const handleClickOutSide = (e:any) => {
        if (ref.current && !ref?.current?.contains(e.target)) {
            onClickOutSide && onClickOutSide();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide, true);
        return () => {
            document.removeEventListener('click', handleClickOutSide, true)
        };
    }, []);
    if (!children) {
        return null;
    }

  return (
    <div ref={ref}>{children}</div>
  )
}

export default ClickOutSide