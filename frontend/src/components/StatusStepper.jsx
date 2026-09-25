const STEPS = ["En preparación", "En camino", "Entregado"];

export default function StatusStepper({ status }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="status-stepper">
      {STEPS.map((step, i) => {
        let cls = "status-step";
        if (i < currentIndex) cls += " done";
        if (i === currentIndex) cls += " current";
        return (
          <div className={cls} key={step}>
            <div className="status-step__dot">{i < currentIndex ? "✓" : i + 1}</div>
            <span className="label">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
