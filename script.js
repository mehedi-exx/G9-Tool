// G9Tool Product Generator Logic

let imgCount = 1;

function addImageInput() {
  if (imgCount < 5) {
    const newInput = document.createElement("input");
    newInput.type = "url";
    newInput.className = "img-url";
    newInput.placeholder = `ছবির লিংক (Image URL) ${imgCount + 1}`;
    document.getElementById("imageInputs").appendChild(newInput);
    imgCount++;
  }
}

document.getElementById("generateBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const code = document.getElementById("code").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const offer = parseFloat(document.getElementById("offer").value);
  const unit = document.getElementById("unit").value.trim();
  const qty = parseInt(document.getElementById("qty").value);
  const brand = document.getElementById("brand").value.trim();
  const color = document.getElementById("color").value.trim();
  const size = document.getElementById("size").value.trim();
  const taste = document.getElementById("taste").value.trim();
  const delivery = document.getElementById("delivery").value || "N/A";
  const status = document.getElementById("status").value.trim();
  const category = document.getElementById("category").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const wa = document.getElementById("wa").value.trim();
  const tag = document.getElementById("tag").value.trim();
  const images = Array.from(document.querySelectorAll(".img-url")).map(i => i.value.trim()).filter(Boolean);

  if (!name || !code || !price || !status || !category || !images.length || !wa) {
    alert("⚠️ প্রয়োজনীয় সব ইনপুট দিন (* চিহ্নিত)।");
    return;
  }

  const mainImage = images[0];
  let thumbs = images.map((src, i) => {
    return `<img src="${src}" style="width:60px;height:60px;border-radius:6px;cursor:pointer;border:2px solid ${i === 0 ? 'green' : 'transparent'};" onclick="changeImage(this)">`;
  }).join("");

  let total = price * (isNaN(qty) ? 1 : qty);
  let finalPrice = `৳${price}`;
  if (!isNaN(offer) && offer < price) {
    const discount = Math.round(((price - offer) / price) * 100);
    finalPrice = `
      <del style="color:#aaa;">৳${price}</del>
      <span style="color:red;font-weight:bold;">৳${offer}</span>
      <small style="color:limegreen">(${discount}% ছাড়)</small>
    `;
    total = offer * (isNaN(qty) ? 1 : qty);
  }

  const waText = encodeURIComponent(`📦 আমি একটি পণ্য অর্ডার করতে চাই
🔖 প্রোডাক্ট: ${name}
💰 মূল্য: ৳${offer || price}${unit ? ` (${unit} × ${qty || 1} = ৳${total})` : ""}
🧾 কোড: ${code}
📁 ক্যাটাগরি: ${category}
🚚 ডেলিভারি টাইম: ${delivery}`);
  const waLink = `https://wa.me/${wa}?text=${waText}`;

  const html = `
<div style="text-align:center;">
  ${tag ? `<div style="margin-bottom:5px;"><span style="background:#ff5722;color:#fff;padding:5px 12px;border-radius:20px;">${tag}</span></div>` : ""}
  <img id="mainImg" src="${mainImage}" style="width:100%;max-width:500px;border-radius:10px;border:1px solid #ccc;margin-bottom:10px;">
  <div id="thumbs" style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
    ${thumbs}
  </div>
  <h2 style="margin:5px 0;">${name}</h2>
  <p style="font-size:18px;">${finalPrice}</p>
</div>
<p style="text-align:center;margin:10px 0;">
  <a href="${waLink}" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;">
    📲 অর্ডার করুন WhatsApp এ
  </a>
</p>
<ul style="list-style:none;padding:0;margin:15px auto;text-align:left;max-width:500px;">
  <li>🔢 কোড: ${code}</li>
  <li>📦 স্ট্যাটাস: ${status}</li>
  <li>📁 ক্যাটাগরি: ${category}</li>
  ${brand ? `<li>🏢 ব্র্যান্ড: ${brand}</li>` : ""}
  ${color ? `<li>🎨 কালার: ${color}</li>` : ""}
  ${size ? `<li>📏 সাইজ: ${size}</li>` : ""}
  ${taste ? `<li>🍽️ টেস্ট: ${taste}</li>` : ""}
  <li>🚚 ডেলিভারি টাইম: ${delivery}</li>
</ul>
${desc ? `<p>${desc}</p>` : ""}
<p style="display:none;">
  <a href="#">
    {getProduct} $price={৳${offer || price}}${!isNaN(offer) && offer < price ? ` $sale={৳${price}}` : ""}
  </a>
</p>

<script>
  function changeImage(el) {
    document.getElementById('mainImg').src = el.src;
    let all = document.querySelectorAll('#thumbs img');
    all.forEach(img => img.style.border = "2px solid transparent");
    el.style.border = "2px solid green";
  }
<\/script>
`;

  document.getElementById("output").textContent = html;
  document.getElementById("preview").innerHTML = html;
});

document.getElementById("copyBtn").addEventListener("click", function () {
  const code = document.getElementById("output").textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ কোড কপি হয়েছে!");
  });
});
