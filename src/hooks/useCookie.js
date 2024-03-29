/*
* SolarMonitoring
* Copyright (C) 2022 Mikołaj Chmielecki
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* LICENSE file in root directory contains a copy of the GNU General Public License.
*/

import { useState } from "react";

const getItem = key =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
       const item = currentCookie.split("=");
       const storedKey = item[0];
       const storedValue = item[1];
       return key === storedKey 
         ? decodeURIComponent(storedValue) 
         : total;
    }, '');

const setItem = (key, value, numberOfDays) => {
  const now = new Date();
  now.setTime(now.getTime() + (numberOfDays * 60 * 60 * 24 * 1000));
  document.cookie = `${key}=${value};     expires=${now.toUTCString()}; path=/`;
};

const useCookie = (key, defaultValue) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());
  const updateCookie = (value, numberOfDays) => {
      setCookie(value);
      setItem(key, value, numberOfDays);
  };
  return [cookie, updateCookie];
};

export default useCookie;