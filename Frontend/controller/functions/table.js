"use strict";
export { fillTable, editable };
// let data = [];

// data.head = [
//     "Full Name",
//     "WebSite",
//     "Contact No"
// ]


// data.body = [
//     {   "name": "John M",
//     "website": "http://john-m.com",
//     "contact": "9876543210"},
//     {   "name": "Ariana Smith",
//     "website": "https://araiana-smith.com",
//     "contact": "1234567890"},
//     {   "name": "Silver Bourne",
//     "website": "https://silver-bourne.com",
//     "contact": "988889888"},
// ]


function fillTable(data) {
    addButton()
    let txt = "",
    head = data.head,
    body = data.body;
    let keys = Object.keys(data.body[0]);
    txt +=`
    <table class="table table-bordered table-striped  table-condensed  text-center" id="dyanmicTable">
	<thead><tr>
    `

    for(let i = 0; i< head.length; i++) {
        console.log(head[i])
        txt +=`
        <th class="text-center">${head[i]}</th>
        `
    }

    txt += `
    </tr></thead><tbody>
    `

    for(let i=0;i< body.length; i++) {
        txt += "<tr>";
        for(let j = 0; j < keys.length; j++) {
            txt +=`<td>${body[i][keys[j]]}</td>
            `
        }
        txt+= "</tr>";
    }

    txt +=`
    </tbody></table>
    `
    console.log(txt);
    return txt;
}


function editable (route) {
        $('#dyanmicTable').SetEditable({ $addButton: $('#addNewRow')});
       
        $('.bAcep').click(function() {
            rowAcep(this, route)
        })

        $('.bElim').click(function() {
                    //Adicionar o fetch aqui

                     // get the current row
                     var currentRow=$(this).closest("tr"); 
                     
                     var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                     var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
                     var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
                     var data=col1+"\n"+col2+"\n"+col3;
                     
                     alert(data);
            });
            rowElim(this, route)
}


function addButton(){
    
let $tab_en_edic = null,
params = null,
colsEdi = null;

//editar o estilo dos butoes para darkMode
const newColHtml = `
<div class="btn-group pull-right">
<button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="rowEdit(this);">
    <span class="glyphicon glyphicon-pencil" ></span>
</button>
<button id="bElim" type="button" class="btn btn-sm btn-default bElim">
    <span class="glyphicon glyphicon-trash" ></span>
</button>
<button id="bAcep" type="button" class="btn btn-sm btn-default bAcep" style="display:none;" >
    <span class="glyphicon glyphicon-ok" ></span>
</button>
<button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowCancel(this);">
    <span class="glyphicon glyphicon-remove" ></span>
</button>
</div>
`,

colEdicHtml = '<td name="buttons">' + newColHtml + '</td>';

$.fn.SetEditable = function (t) {
    let n = {
        columnsEd: null,
        $addButton: null,
        onEdit: function () { },
        onDelete: function () { }
    };
    
    params = $.extend(n, t), 
    this.find("thead tr").append('<th name="buttons"></th>'), 
    this.find("tbody tr").append(colEdicHtml), 
    $tab_en_edic = this,  params.$addButton != null && params.$addButton.click(function () {
        rowAgreg()
    }), 
    params.columnsEd && (colsEdi = params.columnsEd.split(",")) != null
};
}


 

function iterateFieldEdit(t, n) {
    function i(t) {
        if (null == colsEdi) return !0;
        for (let n = 0; n < colsEdi.length; n++)
            if (t == colsEdi[n]) return !0;
        return !1
    }

    let o = 0;
    t.each(function () {
        o++, "buttons" != $(this).attr("name") && i(o - 1) && n($(this))
    })
}

function fijModeNormal(t) {
    $(t).parent().find("#bAcep").hide(), $(t).parent().find("#bCanc").hide(), $(t).parent().find("#bEdit").show(), $(t).parent().find("#bElim").show(), $(t).parents("tr").attr("id", "")
}

function fijModeEdit(t) {
    $(t).parent().find("#bAcep").show(), $(t).parent().find("#bCanc").show(), $(t).parent().find("#bEdit").hide(), $(t).parent().find("#bElim").hide(), $(t).parents("tr").attr("id", "editing")
}

function editionMode(t) {
    return t.attr("id") == "editing" 
}

function rowAcep(t, route) {
    let n = $(t).parents("tr"),
        i = n.find("td");
    editionMode(n) && (iterateFieldEdit(i, function (t) {
        let n = t.find("input").val();

        //Adicionar os valores à fetch

        console.log(n)
        t.html(n)
    }), fijModeNormal(t), params.onEdit(n))
}

function rowCancel(t) {
    let n = $(t).parents("tr"),
        i = n.find("td");
    editionMode(n) && (iterateFieldEdit(i, function (t) {
        let n = t.find("div").html();
        t.html(n)
    }), fijModeNormal(t))
}

function rowEdit(t) {
    let n = $(t).parents("tr"),
        i = n.find("td");
    editionMode(n) || (iterateFieldEdit(i, function (t) {
        let n = t.html(),
            i = '<div style="display: none;">' + n + "</div>",
            o = '<input class="form-control input-sm"  value="' + n + '">';
        t.html(i + o)
    }), fijModeEdit(t))
}

function rowElim(t, route) {
    
    // $(t).parents("tr").remove(), params.onDelete()
}

function rowAgreg() {
    if (0 == $tab_en_edic.find("tbody tr").length) {
        let t = "";
        (i = $tab_en_edic.find("thead tr").find("th")).each(function () {
            "buttons" == $(this).attr("name") ? t += colEdicHtml : t += "<td></td>"
        }), $tab_en_edic.find("tbody").append("<tr>" + t + "</tr>")
    } else {
        let n = $tab_en_edic.find("tr:last");
        n.clone().appendTo(n.parent());
        let i = (n = $tab_en_edic.find("tr:last")).find("td");
        i.each(function () {
            "buttons" == $(this).attr("name") || $(this).html("")
        })
    }
}

function tableToCSV(t) {
    let n = "",
        i = "";
    return $tab_en_edic.find("tbody tr").each(function () {
        editionMode($(this)) && $(this).find("#bAcep").click();
        let o = $(this).find("td");
        n = "", o.each(function () {
            "buttons" == $(this).attr("name") || (n = n + $(this).html() + t)
        }), "" != n && (n = n.substr(0, n.length - t.length)), i = i + n + "\n"
    }), i
}



