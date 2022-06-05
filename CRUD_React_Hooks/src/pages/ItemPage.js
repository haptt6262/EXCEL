import React, { useEffect, useState } from "react";
import { useItem } from "../hooks";
import ImportExcel from "./ImportExcel"
import ExportExcel from "./ExportExcel"
import Export from "./Export"
import FilterData from "./FilterData"

export default function Home(props) {
    const {
        isError,
        isFetching,
        list,
        totalPage,
        activePage,
        message,
        handleAddItem,
        handleDeleteItem,
        handleUpdateItem,
        handlePaginationItem,
        handleSearchPaginationItem,
    } = useItem();
    const [inputName, setInputName] = useState("");
    const [id, setId] = useState("");
    const [textSearch, setTextSearch] = useState("");
    const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        handlePaginationItem(1);
    }, []);
    if (isFetching) {
        return <p>Loading</p>;
    }
    if (isError) {
        return <p>{message}</p>;
    }

    const checkClick = (data) => {
        const isChecked = checkedCheckboxes.some(
            (checkedCheckbox) => checkedCheckbox._id === data._id
        );
        if (isChecked) {
            setCheckedCheckboxes(
                checkedCheckboxes.filter(
                    (checkedCheckbox) => checkedCheckbox._id !== data._id
                )
            );
        } else {
            setCheckedCheckboxes(checkedCheckboxes.concat(data));
        }
    };
    // console.log(checkedCheckboxes)

    let ListItem = [];
    ListItem =
        list &&
        list.length &&
        list.map((item, key) => {
            return (
                <tr key={key}>
                    <th>{key + 1}</th>
                    <th>{item.Name}</th>
                    <th>
                        <input type="checkbox"
                            value={item.Name}
                            checked={checkedCheckboxes.some(
                                (checkedCheckbox) => checkedCheckbox._id === item._id
                            )}
                            onChange={() => { checkClick(item) }} />
                    </th>
                    <th>
                        <button
                            onClick={() => {
                                handleDeleteItem({ id: item._id });
                            }}
                        >
                            DELETE
                        </button>
                        <button
                            style={{ marginLeft: "12px" }}
                            onClick={(e) => {
                                setInputName(item.Name);
                                setId(item._id);
                            }}
                        >
                            SELECT
                        </button>
                    </th>
                </tr>
            );
        });
    return (
        <>
            <div>Homepage</div>
            <div className="excel-form">
                <ImportExcel />
                <ExportExcel />
                <Export checkBoxes={checkedCheckboxes} />
            </div>
            <div>
                <input
                    type="text"
                    value={inputName || ""}
                    onChange={(e) => {
                        setInputName(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        handleAddItem({ name: inputName });
                    }}
                >
                    ADD
                </button>
                <button
                    onClick={() => {
                        handleUpdateItem({ id: id, name: inputName });
                    }}
                >
                    UPDATE
                </button>
            </div>
            <div>
                <input
                    onChange={(e) => {
                        setTextSearch(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        handleSearchPaginationItem({ name: textSearch, activePage: 1 });
                    }}
                >
                    SEARCH
                </button>
            </div>
            <div>
                <FilterData />
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListItem}
                    </tbody>
                </table>
            </div>
            <div>
                {pageNumbers.map((pageNumber) => (
                    <button
                        style={{ background: activePage === pageNumber ? "red" : null }}
                        onClick={() => {
                            handlePaginationItem(pageNumber);
                        }}
                        key={pageNumber}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </>
    );
}

