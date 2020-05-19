import React, {useEffect, useRef, useState} from 'react';

const Draggable = ({...props}) => {

    const [offsetX, setoffsetX] = useState();
    const [progress, setProgress] = useState(0);

    const lineRef = useRef();
    const pointRef = useRef();
    const relX = useRef(0);

    // useEffect(() => {
    //     setoffsetX(props.initOffset);
    // }, [props.location]);

    const getPercent = (currVal, maxVal) => {
        return (currVal * 100) / maxVal;
    };

    const getValue = (percent, maxVal) => {
        return (maxVal * percent) / 100;
    };

    useEffect(() => {
        console.log('Draggable');

        const pointBox = pointRef.current.getBoundingClientRect();
        const lineBox = lineRef.current.getBoundingClientRect();

        // if (props.initOffset && !offsetX) {
        //     console.log('init offsetX', props.initOffset);
        //
        //     setoffsetX(((props.initOffset * (lineBox.width - pointBox.width)) / 100) + lineBox.left);
        //     setProgress((props.initOffset * (lineBox.width - pointBox.width * 0.5)) / 100);
        // } else if(!offsetX) {
        //     setProgress(pointBox.width * 0.5);
        // }

        console.log(props.playingProgress);

        if (props.playingProgress !== null) {
            console.log('change', props.playingProgress);
            setoffsetX(((props.playingProgress * (lineBox.width - pointBox.width)) / 100) + lineBox.left);
            setProgress((props.playingProgress * (lineBox.width - pointBox.width * 0.5)) / 100);
        }
    }, [props.location, props.playingProgress]);

    const onMouseDown = (e) => {
        if (e.button !== 0) return;
        onStart(e);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    };

    const onStart = (e) => {
        const pointBox = pointRef.current.getBoundingClientRect();
        const lineBox = lineRef.current.getBoundingClientRect();

        console.log('clientX', e.clientX);
        console.log('offset left', lineBox.left);

        relX.current = e.clientX - pointBox.left;
        console.log(relX.current);
    };

    const onMouseMove = (e) => {
        const offsetX = e.clientX - relX.current;
        const pointBox = pointRef.current.getBoundingClientRect();
        const lineBox = lineRef.current.getBoundingClientRect();

        // console.log(pointRef.current);

        if (pointBox.left !== offsetX && offsetX >= lineBox.left && ((offsetX + pointBox.width) - lineBox.left) <= lineBox.width) {
            console.log('offset', offsetX);
            setoffsetX(offsetX);
            // pointRef.current.style.left = offsetX;

            setProgress((pointBox.left - lineBox.left) + pointBox.width * 0.5);

            if (props.afterMove) {
                const offsetRel = offsetX - lineBox.left;
                const point = Math.floor((offsetRel * 100) / (lineBox.width - pointBox.width));
                console.log('point', point);

                props.afterMove(point);
            }
        }

        e.preventDefault();
    };

    const onMouseUp = (e) => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if(props.afterUp) {
            const pointBox = pointRef.current.getBoundingClientRect();
            const lineBox = lineRef.current.getBoundingClientRect();

            const offsetRel = e.clientX - relX.current - lineBox.left;
            const point = Math.floor((offsetRel * 100) / (lineBox.width - pointBox.width));
            console.log('timepoint', point);

            props.afterUp(point);
        }

        e.preventDefault();
    };

    return (
        <div className={props.line} ref={lineRef}>
            <div className={props.line} style={{width: progress, backgroundColor: '#70FF00'}}/>
            <div className={props.point}
                 style={{left: offsetX}}
                 ref={pointRef}
                 onMouseDown={onMouseDown}
            />
        </div>
    );
};

export default Draggable;