import React from 'react';
import ReactLoading from 'react-loading';

const Example = () => (
    <div className="flex justify-center items-center h-screen bg-black">
        <ReactLoading type={"cubes"} color={"#38BDF8"} height={'10%'} width={'10%'} />
    </div>
)

export default Example;
