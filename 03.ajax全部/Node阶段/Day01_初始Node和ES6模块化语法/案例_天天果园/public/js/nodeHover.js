// 鼠标移入下拉菜单出现, 移出下拉菜单消失效果
// 样式位置自己写, 这里只是display的切换
function nodeHover(theNode, listNode, direction) { // 参数1: 触发下拉菜单的标签
	// 参数2: 下拉菜单标签
	// 参数3: 左对齐, 还是右对齐(left, right)
	theNode.addEventListener("mouseenter", function(ev){
		listNode.style.display = "block";
		if (direction == "left"){
			listNode.style.left = ev.target.offsetLeft + "px";	
		}
		if (direction == "right"){
			console.log(ev.target.offsetLeft, ev.target.clientWidth);
			console.log(ev);
			listNode.style.right = document.body.clientWidth -  ev.target.offsetLeft - ev.target.clientWidth + "px";	
		}
		
	});
	theNode.addEventListener("mouseleave", function(ev) {
		listNode.style.display = "none";
	});
	listNode.addEventListener("mouseenter", function(ev) {
		this.style.display = "block";
	});
	listNode.addEventListener("mouseleave", function() {
		this.style.display = "none";
	});

}