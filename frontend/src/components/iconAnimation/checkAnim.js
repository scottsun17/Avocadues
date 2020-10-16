import React from 'react';
import mojs from '@mojs/core';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import '../../css/icon.css';

export default function CheckAnim() {
    return (
        <div>
            <FontAwesomeIcon icon={faCheck} />
        </div>
    );
};

;