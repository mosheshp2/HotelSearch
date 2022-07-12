interface IApiSearch {
    search: (model: ISearchModel) => any;
}

interface ISearchModel {
    destination: string;
}