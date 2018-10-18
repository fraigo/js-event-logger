window.onload = function() {
  var base = document.createElement("textarea");
	// viewport style
  base.style.fontSize = "10pt";
  base.style.width = "60%";
  base.style.height = "100px";
  base.style.whiteSpace = "pre";
  base.style.position = "fixed";
  base.style.bottom = "10px";
  base.style.right = "20px";
  base.style.backgroundColor = "rgba(255,255,255,0.8)";
  base.style.border = "1px solid #DDD";
	base.style.borderRadius = "5px 5px";
	base.readOnly = true;
	base.setAttribute("title", "Click to copy to clipboard and clear");
  // viewport content
  base.value = localStorage.getItem("logdata");
  document.body.appendChild(base);
  // viewport click handler
  base.onclick = function(ev) {
		base.select();
		document.execCommand('copy') ;
    base.value = "";
    localStorage.setItem("logdata", "");
  };
  // keydown handler
  document.body.onkeydown = function(ev) {
    _logEvents("KeyDown:" + ev.key + "[" + ev.keyCode + "]");
    console.log(ev);
  };
  // click handler
  document.body.onclick = function(ev) {
    var e = document.elementFromPoint(ev.clientX, ev.clientY);
    _logEvents(
      "Click:[" + ev.clientX + ":" + ev.clientY + "](" + _elementDesc(e) + ")"
    );
    console.log(ev);
    console.log(e);
  };
  // Element description
  window._elementDesc = function(el) {
    if (!el) {
      return "None";
		}
		var desc = el.tagName;
		if (el.id && el.id!=""){
			desc += "#" + el.id;
		} 
		if (el.innerText.trim()!=""){
		  desc += ':' + el.innerText.substring(0,50);
		}
    if (el.tagName == "A") {
      return desc +':'+ el.href;
		}
		if (el.tagName == "INPUT" || el.tagName == "SELECT") {
      return desc +':'+ el.value;
    }
    return desc;
  };
  // Format time
  window._timeFormat = function() {
    var date = new Date();
    return (
      _padNumber(date.getHours()) +
      ":" +
      _padNumber(date.getMinutes()) +
      ":" +
      _padNumber(date.getSeconds())
    );
  };
  // Pad numbers with zero
  window._padNumber = function(num) {
    num = "0000" + num;
    return num.substring(num.length - 2);
  };
  // log events to viewport and save
  window._logEvents = function(data) {
    base.value += "[" + _timeFormat() + "] " + data + "\n";
    localStorage.setItem("logdata", base.value);
    base.scrollTop = base.scrollHeight;
  };

  _logEvents(
    "Page:" + document.location.toString() + "(" + document.title + ")"
  );
};
