/**
 *
 * @param {string} file - srt file content
 * @param {Object} [options] - options
 * @param {boolean} [options.onlyText=true] - only text
 * @returns {*[]}
 */
function srt2json(
    file,
    options = {
        onlyText: true,
    },
) {
    const _options = {
        onlyText: options.onlyText,
    };
    let srt = [];
    let list = file.split("\n").map((item) => {
        if (item.length <= 1 && (item === "\r" || item === "")) {
            return "%0A";
        } else {
            if (item[item.length - 1] !== "\r") {
                return item + "\r";
            }
            return item;
        }
    });
    if (list.length <= 0) return [];
    try {
        list
            .join("")
            .split("%0A")
            .forEach((item) => {
                let obj = {};
                let single = (item.match(/.+?(\r)/g) || []).filter(
                    (item) => item !== "",
                );
                if (_options.onlyText) {
                    single = single.map((item) =>
                        item.replace(/<\/?.+?>|\r|\\ ?(h|N|TEST|\-)|{\/?.+?}/gi, " "),
                    );
                }
                if (single.length <= 0) return;

                let time = single[1].split("  ")[0].split("-->");
                let sList = time.map((item) => {
                    let str = item.replace(/,|\.| /g, "");
                    let t = str.split(":");
                    let s = 0;
                    t.forEach((item, index) => {
                        switch (index) {
                            case 0:
                                s += parseInt(item) * 60 * 60 * 1000;
                                break;
                            case 1:
                                s += parseInt(item) * 60 * 1000;
                                break;
                            case 2:
                                s += parseInt(item);
                                break;
                        }
                    });
                    // console.log(s)
                    return s;
                });
                let body = single.slice(2);
                obj["index"] = single[0].replace(/\r/g, "") * 1;
                obj["start"] = sList[0];
                obj["end"] = sList[1];
                obj["text"] = body;
                srt.push(obj);
            });
    } catch (e) {
        console.log(new Error(e));
    }
    return srt;
}
if (typeof module !== "undefined") module.exports = srt2json;