import { useState } from "react";
import { PollItem } from "./poll-item";

const initialPollData = {
  isAnswered: false,
  items: [
    {
      id: "1",
      label: "Yes",
      value: 60,
      isSelected: false,
    },
    {
      id: "2",
      label: "No",
      value: 25,
      isSelected: false,
    },
    {
      id: "3",
      label: "Maybe",
      value: 15,
      isSelected: false,
    },
  ],
};

export function Poll() {
  const [poll, setPoll] = useState(() => initialPollData);
  const { isAnswered, items } = poll;

  const handleSelection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedItemId = Array.from(
      e.currentTarget.elements as unknown as HTMLInputElement[]
    ).find((radio) => radio.checked)?.id;

    setPoll((prev) => ({
      ...prev,
      isAnswered: !prev.isAnswered,
      items: prev.items.map((item) =>
        item.id !== selectedItemId
          ? item
          : {
              ...item,
              isSelected: !item.isSelected,
            }
      ),
    }));
  };

  return (
    <>
      <form onChange={handleSelection}>
        <ul>
          {items.map((item) => (
            <PollItem key={item.id} isAnswered={isAnswered} {...item} />
          ))}
        </ul>
      </form>

      <style jsx>{`
        form {
          display: flex;
          justify-content: center;
          height: 100%;
          width: 100%;
          margin: var(--space3XL) 0;
        }

        ul {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spaceS);
          max-width: 300px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
