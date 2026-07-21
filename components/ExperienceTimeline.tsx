"use client";

import { useState } from "react";
import type { Experience } from "../lib/content";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const [selected, setSelected] = useState(0);
  const current = experiences[selected];

  function selectFromKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % experiences.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + experiences.length) % experiences.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = experiences.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`experience-tab-${next}`)?.focus();
  }

  return (
    <div className="experience-layout">
      <div className="experience-tabs" role="tablist" aria-label="Professional experience">
        {experiences.map((experience, index) => (
          <button
            aria-controls={`experience-panel-${index}`}
            aria-selected={selected === index}
            className={selected === index ? "active" : undefined}
            id={`experience-tab-${index}`}
            key={experience.client}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => selectFromKeyboard(event, index)}
            role="tab"
            tabIndex={selected === index ? 0 : -1}
            type="button"
          >
            <span>{experience.dates}</span>
            <strong>{experience.client}</strong>
            <small>{experience.role}</small>
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`experience-tab-${selected}`}
        className="experience-panel"
        id={`experience-panel-${selected}`}
        role="tabpanel"
        tabIndex={0}
      >
        <p className="eyebrow">Selected engagement</p>
        <h3>{current.client}</h3>
        <p className="experience-summary">{current.summary}</p>
        <div className="workstreams">
          {current.workstreams.map((workstream, index) => (
            <details key={workstream.title} open={index === 0}>
              <summary>{workstream.title}<span aria-hidden="true">+</span></summary>
              <ul>{workstream.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
