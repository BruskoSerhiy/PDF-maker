import React, { useDeferredValue } from "react";
import { Link, Outlet } from "react-router-dom";

import { useRecoilState } from "recoil";

import { nameState } from "../atoms/nameAtom";

import css from "./Layout.module.css";

function Layout() {
  const [text] = useRecoilState(nameState);
  const url = useDeferredValue(text);

  return (
    <div className={css.root}>
      <header className={css.header}>
        <h1>PDF Maker</h1>

        <div>
          <Link to="/">Home</Link>
          <Link to="/test">Test page</Link>
        </div>

        {url && (
          <div className={css.avatar}>
            <img src={`https://robohash.org/${url}`} alt="Avatar" />
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
