Let me look at the skills directory structure and the graph data before reading individual files.

---

I'll explore the overall `skills` directory layout first, then read the candidate files.

---

powershell command: Get-ChildItem -Recurse -Directory skills | Select-Object -ExpandProperty FullName | ForEach-Object { $_.Replace((Get-Location).Path + '\', '') }

---

Let me examine the directory tree of the `skills` folder to understand its organization.
