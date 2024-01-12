import { ThemeService } from "@/services/theme/theme.service";
import { ITheme } from "@/types/theme.interface";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction, useState } from "react";

export interface ICreateThemePopupProps {
  isVisible: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ITheme[], Error>>;
}

const CreateThemePopup: FC<ICreateThemePopupProps> = ({
  isVisible,
  onClick,
  refetch,
}) => {
  const [name, setName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shifr, setShifr] = useState("");
  const [head, setHead] = useState("");

  const { mutate: addTheme } = useMutation({
    mutationKey: ["create theme"],
    mutationFn: () =>
      ThemeService.create({
        themeName: name,
        themeCode: shifr,
        themeHead: head,
        endDate: endDate,
      }),
    onSuccess() {
      refetch();
      onClick(!isVisible);
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <section
      className={isVisible ? "popup popup_opened" : "popup"}
      onClick={() => {
        onClick(!isVisible);
        setName("");
        setEndDate("");
        setShifr("");
        setHead("");
      }}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          title="close-button"
          type="reset"
          className="popup__close-button popup__close-button_parent-corners_straight"
        />
        <h2 className="popup__title">Добавить тему</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addTheme();
          }}
        >
          <input
            className="form__input"
            placeholder="Название темы"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form__input"
            placeholder="Шифр темы"
            value={shifr}
            onChange={(e) => setShifr(e.target.value)}
          />
          <input
            className="form__input"
            placeholder="Руководитель"
            value={head}
            onChange={(e) => setHead(e.target.value)}
          />
          <input
            className="form__input"
            placeholder="Дата окончания в формате - 2024-05-11"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            title="Добавить"
            type="submit"
            className="popup__button form__button"
          >
            Добавить
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateThemePopup;
