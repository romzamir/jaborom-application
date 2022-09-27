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
        <ProfileFieldContainer title={title} className='profile-toggle-field'>
            {isEditMode
                ? options.map((option) => (
                      <label key={option}>
                          <input
                              type='radio'
                              checked={option === value}
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
