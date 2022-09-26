import {ProfileFieldContainer} from '../field';

export type ProfileToggleFieldProps = {
    title: string;
    value: string;
    setValue: (value: string) => void;
    options: string[];
    isEditMode: boolean;
};

export function ProfileToggleField({
    title,
    value,
    setValue,
    options,
    isEditMode,
}: ProfileToggleFieldProps) {
    return (
        <ProfileFieldContainer title={title}>
            {isEditMode
                ? options.map((option) => (
                      <label>
                          <input
                              type='radio'
                              onChange={(event) => {
                                  if (event.currentTarget.checked) {
                                      setValue(option);
                                  }
                              }}
                          />
                          {option}
                      </label>
                  ))
                : value}
        </ProfileFieldContainer>
    );
}
