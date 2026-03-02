function inline(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-violet-300 text-sm font-mono">$1</code>'
    )
}

function renderTable(lines: string[]): string {
  if (lines.length < 2) return ""

  const parseRow = (line: string): string[] =>
    line
      .split("|")
      .map((c) => c.trim())
      .filter((c, i, arr) => !(i === 0 && !c) && !(i === arr.length - 1 && !c))

  const headerCells = parseRow(lines[0])
    .map((c) => `<th class="px-4 py-2 text-left text-sm font-semibold text-white">${inline(c)}</th>`)
    .join("")

  const bodyRows = lines
    .slice(2)
    .map((line) => {
      const cells = parseRow(line)
        .map((c) => `<td class="px-4 py-2 text-sm text-zinc-300 border-t border-zinc-800">${inline(c)}</td>`)
        .join("")
      return `<tr>${cells}</tr>`
    })
    .join("")

  return `<div class="overflow-x-auto mb-6 rounded-xl border border-zinc-800"><table class="w-full"><thead class="bg-zinc-800/50"><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.trim().split("\n")
  const output: string[] = []
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line) {
      i++
      continue
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim())
        i++
      }
      output.push(renderTable(tableLines))
      continue
    }

    // H1
    if (line.startsWith("# ")) {
      output.push(
        `<h1 class="text-3xl font-bold text-white mt-10 mb-4">${inline(line.slice(2))}</h1>`
      )
    }
    // H2
    else if (line.startsWith("## ")) {
      output.push(
        `<h2 class="text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b border-zinc-800">${inline(line.slice(3))}</h2>`
      )
    }
    // H3
    else if (line.startsWith("### ")) {
      output.push(
        `<h3 class="text-xl font-semibold text-white mt-6 mb-2">${inline(line.slice(4))}</h3>`
      )
    }
    // Bullet list
    else if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(`<li class="mb-1.5">${inline(lines[i].trim().slice(2))}</li>`)
        i++
      }
      output.push(
        `<ul class="list-disc list-inside space-y-1 text-zinc-300 mb-4 ml-2">${items.join("")}</ul>`
      )
      continue
    }
    // Ordered list
    else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(
          `<li class="mb-1.5">${inline(lines[i].trim().replace(/^\d+\. /, ""))}</li>`
        )
        i++
      }
      output.push(
        `<ol class="list-decimal list-inside space-y-1 text-zinc-300 mb-4 ml-2">${items.join("")}</ol>`
      )
      continue
    }
    // Paragraph
    else {
      output.push(`<p class="text-zinc-300 leading-relaxed mb-4">${inline(line)}</p>`)
    }

    i++
  }

  return output.join("\n")
}
