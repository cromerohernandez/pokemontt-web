export interface IUseFormInput {
  initialValue?: string,
  validator?: (value: string | null) => boolean,
  initialErrorMessage?: string,
}
