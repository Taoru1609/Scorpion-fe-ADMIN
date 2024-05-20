/* eslint-disable react-hooks/exhaustive-deps */
import React, { SetStateAction, useCallback, useEffect } from "react";

type DispatchAsync<A> = (value: A) => Promise<A>;
interface ValueStateAsync<A> {
	value: A
}

export function useStatePromise<S>(initialState: S | (() => S)): [ValueStateAsync<S>, DispatchAsync<SetStateAction<S>>] {
	const [value, setValue] = React.useState(initialState);
	const [resetted, setResetted] = React.useState<boolean>(false)
	const valueTemp = React.useRef<ValueStateAsync<S>>({ value: value });
	const resolverRef = React.useRef<any>(null);

	useEffect(() => {
		valueTemp.current.value = value;
		if (resolverRef.current) {
			resolverRef.current(value);
			resolverRef.current = null;
			setResetted(true);
		}
		/**
		 * Vì một trạng thái cập nhật có thể được kích hoạt lại chính xác cùng với một trạng thái
		 * nên nó không đủ để chỉ định state là một phụ thuộc duy nhất của useEffect
		 * đó là lý do tại sao resolverRef.current cũng là một phụ thuộc, bởi vì nó đảm bảo
		 * hàm handleSetState đã được gọi trong lần render trước
		 */
	}, [resolverRef.current, value]);

	// refesh render
	useEffect(() => {
		if (resetted) {
			setResetted(false);
		}
	}, [resetted]);

	const setValueAsync = useCallback((valueUpdate: React.SetStateAction<S>): Promise<S> => {
		setValue(valueUpdate);
		return new Promise(resolve => {
			if (valueUpdate === valueTemp.current?.value) {
				resolve(valueTemp.current.value);
				return;
			}
			resolverRef.current = resolve;
		});
	}, [setValue]);

	return [valueTemp.current, setValueAsync];
};
