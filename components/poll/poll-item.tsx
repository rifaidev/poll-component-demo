interface PollItemProps {
  id: string
  isAnswered: boolean
  isSelected: boolean
  label: string
  value: number
}

export function PollItem(props: PollItemProps) {
  const { id, isAnswered, isSelected, label, value } = props
  const percentage = `${value}%`

  return (
    <>
      <li>
        <label htmlFor={id}>
          <span className="label">{label}</span>
          <span className="percentage">{percentage}</span>
          {!isAnswered ? (
            <input type="radio" id={id} value={percentage} />
          ) : null}
        </label>
      </li>

      <style jsx>{`
        li {
          user-select: none;
          background: var(--pollItemBackground);
          height: var(--spaceXXL);
          border-radius: calc(var(--spaceXXL) / 2);
          padding: 0 var(--spaceM);
          overflow: hidden;
          position: relative;
        }

        li::before {
          content: '';
          display: ${isAnswered ? 'block' : 'none'};
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          max-width: ${percentage};
          animation: pollIndicatorFill 3s normal forwards;
          background: ${isSelected
            ? 'var(--pollIndicatorPrimary)'
            : 'var(--pollIndicatorSecondary)'};
        }

        label {
          cursor: ${isAnswered ? 'default' : 'pointer'};
          position: relative;
          margin: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        span.label {
          flex: ${isAnswered ? '1' : '0'};
          transition: all 1s;
        }

        span.percentage {
          position: absolute;
          right: 0;
          opacity: ${isAnswered ? '1' : '0'};
          transition: all 300ms;
        }

        input {
          visibility: hidden;
          position: absolute;
        }
      `}</style>
    </>
  )
}
