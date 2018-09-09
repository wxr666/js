
$(".d1").datepicker({
	showOtherMonths: true,		//在当前月，显示其它月的日期
	selectOtherMonths: true,	//显示的其它月的日期，是否可以点击
	showButtonPanel: true,		//显示今天和关闭按钮面板
	changeMonth: true,			//显示月的下拉框
	changeYear: true,			//显示年的下拉框
	numberOfMonths: 2,			//显示多个月份

	showOn: "button",			//点击输入框旁边的图标来显示 datepicker
	buttonImage: "images/p.png",
	buttonImageOnly: true,

	altField: "#d8",			//同时向另一个输入框填入日期

	minDate: -3,				//今天的前三天可选
	maxDate: 3,					//今天的后三天可选

	beforeShowDay: $.datepicker.noWeekends,		//周末不可选

});







