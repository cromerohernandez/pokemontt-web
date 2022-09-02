export interface IUseFormInput {
  initialValue?: string,
  validator?: (value: string) => boolean,
  initialErrorMessage?: string,
}
