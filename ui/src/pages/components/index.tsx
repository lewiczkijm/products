import React from "react";
import { Link } from "react-router-dom";
import { MediaComponent as Media } from "./MediaComponent";
import { Paginator as Pager } from "./paginator";
import { PriceComponent as Price } from "./PriceComponent";
import { SearchString as Search } from "./searchString";

export const MemoLink = React.memo(Link);
export const SearchString = React.memo(Search);
export const Paginator = React.memo(Pager);
export const MediaComponent = React.memo(Media);
export const PriceComponent = React.memo(Price);
