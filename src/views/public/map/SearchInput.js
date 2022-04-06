import React, { memo, useEffect, useRef, useState } from "react";

const SearchInput = memo(
  ({
    map,
    handleSearch = () => {},
    handleShow = () => {},
    onSearch = () => {},
    isSearch,
    dmTinhThanhPho,
  }) => {
    const refTimeout = useRef();
    const [state, _setState] = useState({});
    const { searchString = "" } = state;
    const setState = (data) => {
      _setState((pre) => ({ ...pre, ...data }));
    };

    const handleInputSearch = (e) => {
      setState({ searchString: e });
      if (refTimeout.current) {
        clearTimeout(refTimeout.current);
      }
      refTimeout.current = setTimeout(() => {
        handleSearch(e);
      }, 500);
    };

    // const onClickSearch = (c) => () => {
    //   onSearch(c);
    // };

    useEffect(() => {
      document.body.addEventListener("mousedown", (e) => {
        if (
          (typeof e.target.className === "string"
            ? e.target.className
            : ""
          ).indexOf("zone-focus-input-search") === -1
        ) {
          handleShow(false)();
        }
      });
    }, []);

    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 0,
          zIndex: 400,
        }}
      >
        <div className="province-select zone-focus-input-search">
          <div className="box-slect zone-focus-input-search">
            <label htmlFor="" className="input-key">
              <input
                onFocus={handleShow(true)}
                type="text"
                className="input-province zone-focus-input-search"
                value={searchString}
                onChange={(e) => handleInputSearch(e.target.value)}
                placeholder="Tìm tên Tỉnh/Chọn Tỉnh"
              />
            </label>
            {isSearch && (
              <div className="wrap-province zone-focus-input-search">
                <ul className="list-province zone-focus-input-search">
                  {dmTinhThanhPho?.map((c) => {
                    return (
                      <li
                        key={c.id}
                        className={`province-item ${
                          c.status ? "type-1" : "type-2"
                        } zone-focus-input-search`}
                      >
                        <div
                          className="pb-2 pt-2 pl-2 cursor-pointer zone-focus-input-search"
                          onClick={onSearch(c)}
                        >
                          {c.ten}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default SearchInput;
