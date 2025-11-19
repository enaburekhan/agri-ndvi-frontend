// this file serves as a central hub for re-exporting pre-typed redux hooks

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// use throughout the app instead of plain `useDispatch` and `useSelector` to get properly typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
