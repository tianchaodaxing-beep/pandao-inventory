(function () {
  "use strict";
  const U = Pandao,
    B = Business;
  const app = U.mount({
    title: "库存与补货助手",
    icon: "▦",
    category: "采购与库存",
    description: "结合销量、在途库存、采购周期与包装数量，生成补货建议。",
    repo: "https://github.com/tianchaodaxing-beep/pandao-inventory",
  });
  const fields = [
    ["商品编号", "sku", "DEMO-001"],
    ["日均销量", "daily", 8],
    ["现有库存", "stock", 100],
    ["在途库存", "inbound", 20],
    ["已占用库存", "committed", 10],
    ["采购周期（天）", "lead", 14],
    ["安全库存（天）", "safety", 7],
    ["补货间隔（天）", "review", 7],
    ["每包装数量", "pack", 12],
    ["起订量", "moq", 24],
  ];
  const p = U.panel("库存输入"),
    form = U.h("form"),
    grid = U.h("div", { class: "grid" });
  for (const [label, key, val] of fields)
    grid.append(
      U.field(label, key, val, key === "sku" ? "text" : "number").wrap,
    );
  form.append(grid);
  p.append(form, U.actions(U.button("计算补货", U.run(calculate), true)));
  app.input.append(p);
  const out = U.panel("补货建议"),
    batch = U.panel("批量结果");
  app.output.append(out, batch);
  let rows = [];
  const mapping = Object.fromEntries(fields.map(([c, k]) => [k, c]));
  const template = [Object.fromEntries(fields.map(([c, k, v]) => [c, v]))];
  function result(r) {
    const v = B.inventory(r);
    return {
      商品编号: v.sku,
      可用及在途: v.position,
      补货触发库存: v.reorder,
      目标库存: v.target,
      建议补货数量: v.suggestion,
      现货可售天数: v.coverage === null ? "" : v.coverage,
      状态: v.status,
    };
  }
  function calculate() {
    const r = U.values(form),
      v = B.inventory(r);
    U.clear(out).append(
      U.h("h2", { text: r.sku + " · 补货建议" }),
      U.metrics([
        ["建议补货", v.suggestion, "件"],
        ["现货可售", v.coverage === null ? "—" : v.coverage, "天"],
        ["库存状态", v.status, ""],
      ]),
      U.table(
        ["商品编号", "可用及在途", "补货触发库存", "目标库存"],
        [result(r)],
      ),
      U.actions(
        U.button("导出补货建议", () =>
          U.exportRows("补货建议.xlsx", [result(r)]),
        ),
      ),
    );
    U.source("手动测算：" + r.sku);
  }
  app.input.append(
    U.dataPanel("批量补货测算", template, (data) => {
      rows = data.rows.map((row, index) => {
        try {
          return result(
            Object.fromEntries(
              Object.entries(mapping).map(([k, c]) => [k, row[c]]),
            ),
          );
        } catch (e) {
          return {
            商品编号: row["商品编号"] || "第" + (index + 2) + "行",
            状态: e.message,
          };
        }
      });
      U.clear(batch).append(
        U.h("h2", { text: "批量结果" }),
        U.table(["商品编号", "建议补货数量", "现货可售天数", "状态"], rows),
        U.actions(
          U.button("导出批量建议", () => U.exportRows("批量补货.xlsx", rows)),
        ),
      );
    }),
  );
  calculate();
  U.source("演示数据");
})();
