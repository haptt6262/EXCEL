import React, { useEffect, useState } from "react";
import { useItem } from "../hooks";

export default function Home() {
    const {
        isError,
        // handleFetchList,
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
    // const [currentPage, setCurrentPage] = useState(1)
    // const [itemsPerPage] = useState(5)
    // const indexOfLastItem = currentPage * itemsPerPage
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage
    // const currentItems = list.slice(indexOfFirstItem, indexOfLastItem)
    const [inputName, setInputName] = useState("");
    const [id, setId] = useState();
    const [textSearch, setTextSearch] = useState("");

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        handlePaginationItem(1);
        // handleFetchList()
    }, []);
    if (isFetching) {
        return <p>Loading</p>;
    }
    if (isError) {
        return <p>{message}</p>;
    }
    let ListItem = [];
    ListItem = list.map((item, key) => {
        return (
            <tr key={key}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>
                    <button
                        onClick={() => {
                            handleDeleteItem({ id: item.id });
                        }}
                    >
                        DELETE
                    </button>
                </th>
                <th>
                    <button
                        onClick={(e) => {
                            setInputName(item.name);
                            setId(item.id);
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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>{ListItem}</tbody>
            </table>
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
