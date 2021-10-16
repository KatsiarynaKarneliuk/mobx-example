
import { React } from 'react';

function BtnAction(props) {

    return (
        <div>
            <button {...props}>{props.btnName}</button>
        </div>
    )
}
export default BtnAction;