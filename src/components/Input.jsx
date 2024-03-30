import React, { useState, useEffect } from 'react';

const Input = () => {
    const [val, setVal] = useState(''); // input value 
    const [item, setItem] = useState(() => {
        const localValue = localStorage.getItem("ITEMS");
        return localValue ? JSON.parse(localValue) : [];
    }); // items to do 
    const [classList, setClassList] = useState(() => {
        const localClassList = localStorage.getItem("CLASS_LIST");
        return localClassList ? JSON.parse(localClassList) : Array(item.length).fill("notDone");
    }); // class list for li elements

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(item));
        localStorage.setItem("CLASS_LIST", JSON.stringify(classList));
    }, [item, classList]);

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (val.trim().length > 0) {
                setItem([...item, val]);
                setClassList([...classList, "notDone"]); // add "notDone" class for new item
                setVal("");
            }
        }
    }

    const toggleClass = (index) => {
        const newClassList = [...classList];
        newClassList[index] = newClassList[index] === "notDone" ? "done" : "notDone";
        setClassList(newClassList);
    };

    let clear = () => {
        setItem([]);
        setClassList([]);
        localStorage.clear();
    };

    let add = () => {
        if (val.trim().length > 0) {
            setItem([...item, val]);
            setClassList([...classList, "notDone"]);
            setVal("");
        }
    };

    let Delet = (index) => {
        const newClassList = [...classList];
        newClassList.splice(index, 1);
        setItem(item.filter((_, i) => i !== index));
        setClassList(newClassList);
    };

    let forEdit = (index) => {
        if (val.trim().length === 0) {
            return;
        } else {
            setItem((prevItem) => {
                const newItem = [...prevItem];
                newItem[index] = val;
                return newItem;
            });
        }
    };

    return (
        <div>
            <div></div>
            <div>
                <input
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setVal(e.target.value)}
                    value={val}
                    placeholder='add your todos or make edit on it'
                    type="text"
                    className='input'
                />
                <button onClick={add} className='add'>Add</button>
                <button className='add clear' onClick={clear}>Clear</button>
            </div>
            <div>
                <ul>
                    {item.map((i, index) => (
                        <div key={index} className='wrab-items'>
                            <li className={classList[index]} key={index}>
                                <p>{i}</p>
                                <button onClick={() => Delet(index)}>Delete</button>
                                <button onClick={() => toggleClass(index)}>Done</button>
                                <button onClick={() => { forEdit(index); setVal("") }} className='add'>Edit</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Input;
