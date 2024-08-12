import React from 'react';

export default function Loader() {
    const loaderStyle = {
        border: '16px solid #f3f3f3',
        borderTop: '16px solid #3498db',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        animation: 'spin 2s linear infinite'
    };

    const keyframe = `@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
     }`
    return (
        <div>
            <style>{keyframe}</style>
            <div className='loader' style={loaderStyle}></div>
        </div>

    );
}
