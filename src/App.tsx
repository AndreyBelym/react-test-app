import { FC, useEffect, useMemo, useState } from "react";
import "./styles.css";

// 1.
// Применяем TS

// Описать тип comments
// тип id будет известен только в момент
// подстановки типа к comments

// тут
type Comment = {
  id: number;
  text: string;
  children?: Comment[];
};

const comments: Comment[] = [
  {
    id: 1,
    text: "message 1",
    children: [
      {
        id: 3,
        text: "message 3",
      },
    ],
  },
  {
    id: 2,
    text: "message 2",
    children: [
      {
        id: 4,
        text: "message 4",
        children: [
          {
            id: 7,
            text: "message 7",
          },
          {
            id: 8,
            text: "message 8",
          },
        ],
      },
      {
        id: 5,
        text: "message 5",
      },
    ],
  },
];

// 3.
// Делаем псевдозагрузку структуры с сервера - как promise + setTimeout

// Получаем список children по id родительского узла
// Примечание! Тут возвращается весь массив включая вложенное дерево.
// Передается данных больше, чем надо. Можно доработать и передавать меньше данных.
// В реальной жизни backEnd не отдает больше данных чем надо

// 2.
// Написать компонент (ФК), показывающий вот такую структуру:
// + message 1
// - message 2
//   + message 4
//     message 5

// Скрываем / раскрываем как дерево +/-
// вариант 1 - всю структуру на старте, показывая Loading...
// вариант 2 - подзагрузка уровня по клику +, показыввая Loading... вместо message N

// Компонент - узел дерева
// Имеет состояние открыт/закрыт
// При открытии делает запрос к getComments для отложенного получения
//   children по id этого узла
// при отсутствии id родительского узла, деалется запрос ко всем children
//  верхнего уровня
// При октрытии узла отображается "Loading..." до получения данных
// ПО умолчанию "+" отображается всегда до первого запроса, т.к.
//   заранее нельзя узнать (при использовании backend
//   и не делая запроса на уровень +1) количество вложенных элементов
//   при загрузке списка элементов и отстутсвии children кнопка "+" пропадает

// 4. Опционально
// Написать компонент,
// показывающий текущее занчение скролла
// window.scrollY

// 2, 3 пишем тут
// вставляем в App вместо "Comments..."
type Props = {
  comment: Comment;
};

const CommentComponent = ({ comment }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<Comment[] | null>(null);

  return (
    <div>
      <div>
        {comment.children ? (isOpen ? "-" : "+") : null} {comment.text}
      </div>

      {comment?.children?.map((item) => {
        return <CommentComponent key={comment.id} comment={item} />;
      })}
    </div>
  );
};

// 2
function App() {
  return <CommentComponent comment={comments[0]} />;
}

export default App;
