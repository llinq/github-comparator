export class KeyValueModel<T, K> {
	
	constructor(
		key?: T,
		value?: K
	) {
		this.key = key;
		this.value = value;
	}

	key: T;
	value: K;

}