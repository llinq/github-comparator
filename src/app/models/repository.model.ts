export class RepositoryModel {

	// repository_id: number;
	description: string;
	name: string;

	forks: RepositoryValueModel;
	stars: RepositoryValueModel;
	contributors: RepositoryValueModel;
	
}

export class RepositoryValueModel {
	value: string | number;
	type: RepositoryValueEnumModel;
	differ: number;
}

export enum RepositoryValueEnumModel {

	EQUAL,
	BIGGER,
	SMALLER

}