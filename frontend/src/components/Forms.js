import React from 'react';


function Forms(props) {
    
    return (
        <div>
            <form className="mainForm" onSubmit={props.onSubmit}> 
                <input type="text" name="id" placeholder="ID..."></input>
                <input type="text" name="title" placeholder=" Title.."></input>
                <button>Add new project</button>
            </form>
        </div>
    );
};

export default Forms;
