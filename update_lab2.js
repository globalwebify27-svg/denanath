const htmlContent = `
<p><strong>Mannequins for basic nursing skills.</strong></p>

<p><strong>IV arms :</strong></p>
<ul>
  <li>For peripheral IV insertion skill.</li>
  <li>Facility of simulated blood for checking accuracy of the skill.</li>
</ul>

<p><strong>Urinary catheter insertion and care (Male / Female) + Enema :</strong></p>
<ul>
  <li>Male and female pelvic models for skill practice</li>
  <li>Urine / stools can be simulated.</li>
</ul>

<p><strong>Full body nursing mannequin :</strong></p>
<ul>
  <li>Patient communication skills.</li>
  <li>Basic and advanced airway management skills.</li>
  <li>Urinary catheterization and catheter care.</li>
  <li>Care of chest tube, tracheostomy tube.</li>
  <li>Tracheostomy suctioning skill.</li>
  <li>Nasogastric tube insertion and feeding.</li>
</ul>

<p>Param<br>IV arm</p>
<p>Param<br>Nursing anne</p>
`;

async function main() {
  try {
    // First fetch existing
    let existingData = { title: "Simulation Lab 2", content: "", image: "" };
    try {
      const res = await fetch("http://localhost:3000/api/settings?key=page_simulation_lab2");
      if (res.ok) {
        const json = await res.json();
        if (json && json.value) {
            existingData = JSON.parse(json.value);
        }
      }
    } catch(e) {
      console.log("Could not fetch existing, using default structure");
    }

    existingData.content = htmlContent;

    const res = await fetch("http://localhost:3000/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "page_simulation_lab2",
        value: JSON.stringify(existingData),
        pathsToRevalidate: [
          "/simulation-center",
          "/academics/simulation-center",
          "/academics/simulation-center/lab-2",
          "/admin/academics/simulation-center"
        ]
      })
    });
    
    if (!res.ok) {
        console.error('Failed API request:', await res.text());
        return;
    }
    console.log("Successfully updated Simulation Lab 2 content.");
  } catch (e) {
    console.error("Error updating API:", e);
  }
}

main();
