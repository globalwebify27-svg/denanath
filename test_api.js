fetch("http://localhost:3000/api/settings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "page_home", value: JSON.stringify({seoMetaTitle: "Test"}) })
}).then(res => res.json()).then(console.log).catch(console.error);
