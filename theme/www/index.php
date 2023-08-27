<? include_once($_SERVER['LOCAL_PATH']."/includes/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Mimpara</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=1024; initial-scale=1.0; maximum-scale=1.0;" />

	<? if($_SESSION["dev"]) { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
		<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>
	<? } else { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
		<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script>
	<? } ?>

</head>

<body class="front i:validdevice">

<div id="page">

	<div id="header" class="i:header">
		<ul>
			<li class="button close_a id:slide11">close</li>
			<li class="item0"></li>
			<li class="button item2 id:slide2"></li>
			<li class="button item3 id:slide3_1"></li>
			<li class="button item4 id:slide4"></li>
			<li class="button item5 id:slide5"></li>
			<li class="button home id:slide1">home</li>
			<li class="button item6 id:slide6_1"></li>
			<li class="button item7 id:slide7_1"></li>
			<li class="button item8 id:slide8_1"></li>
			<li class="button item9 id:slide9_1"></li>
			<li class="button item10 id:slide10"></li>
			<li class="button close_b id:slide11">close</li>
		</ul>
	</div>

	<div id="content" class="i:content">

		<ul>
			<li class="pri slide slide1 ready"><h2>Home</h2></li>

			<li class="pri slide slide2 i:slide2"><h2>Misslijkheid</h2></li>
			<li class="pri slide slide3 i:swipe">
				<ul>
					<li class="slide slide3_1 ready"><h2>Doseringskaart 1</h2></li>
					<li class="slide slide3_2 ready"><h2>Doseringskaart 2</h2></li>
				</ul>
			</li>
			<li class="pri slide slide4 i:slide4">
				<h2>Referenties</h2>
				<div class="ref_drag">
					<div class="ref">
						<h1>Referenties:</h1>
						<p class="ref01">
							1.
							<a href="javascript:openPDF('pdf/1_SmPC Mimpara Sep 09.pdf');">Mimpara<sup>®</sup> (cinacalcet) Samenvatting van de productkenmerken. Amgen Breda, Netherlands; september 2009.</a>
						</p>
						<p class="ref02">
							2.
							<a href="javascript:openPDF('pdf/2_Moe_KI_2005.67.760-771.pdf');">Moe SM, Chertow GM, Coburn JW, et al. Achieving NKF-K/DOQI™ bone metabolism and disease treatment goals with cinacalcet HCl. <em>Kidney Int.</em> 2005;67:760-771.</a>
						</p>
						<p class="ref03">
							3.
							<a href="javascript:openPDF('pdf/3_Cunningham_KI_2005.68.1793-1800.pdf');">Cunningham J, Danese M, Olson K, et al. Effects of the calcimimetic cinacalcet HCl on cardiovascular disease, fracture, and health-related quality of life in secondary hyperparathyroidism. <em>Kidney Int.</em> 2005;68:1793-1800.</a>
						</p>
						<p class="ref04">
							4.
							<a href="javascript:openPDF('pdf/4_Block JASN 2004.pdf');">Block GA, Klassen PS, Lazarus JM, et al. Mineral metabolism, mortality, and morbidity in maintenance hemodialysis. J Am Soc Nephrol. 2004;15:2208-2218.</a>
						</p>
						<p class="ref05">
							5.
							<a href="javascript:openPDF('pdf/5_Danese_AJKD_2006.pdf');">Danese MD, Kim J, Doan QV, et al. PTH and the risk for hip, vertebral,and pelvic fractures among patients on dialysis. Am J Kidney Dis. 2006;47:149-156.</a>
						</p>
						<p class="ref06">
							6.
							<a href="javascript:openPDF('pdf/6_Moe (KDIGO)_Kidney Int_2006.pdf');">Moe S, Drüeke T, Cunningham J, et al. Definition, evaluation, and classification of renal osteodystrophy: a position statement from Kidney Disease: Improving Global Outcomes (KDIGO). Kidney Int. 2006;69:1945-1953.</a>
						</p>
						<p class="ref07">
							7.
							<a href="javascript:openPDF('pdf/7_Tentori_KI_2006_1858-1865.pdf');">Tentori F, Hunt WC, Stidley CA, et al. Mortality risk among hemodialysis patients receiving different vitamin D analogs. <em>Kidney Int.</em> 2006;70:1858-1865. </a>
						</p>
						<p class="ref08">
							8.
							<a href="javascript:openPDF('pdf/8_Wetmore_Nat Clin Pract Nephrol 2009.24-33.pdf');">Wetmore J and Quarles D. Calcimimetics or vitamin D analogs for suppressing parathyroid hormone in end-stage renal disease: time for a paradigm shift? <em>Nat Clin Pract Nephrol.</em> 2009;5(1):24-33.</a>
						</p>
						<p class="ref09">
							9.
							<a href="javascript:openPDF('pdf/9_Messa Clin J Am Soc Nephrol 3 36-45 2008.pdf');">Messa P, Macário F, Yaqoob M, et al. The OPTIMA Study: assessing a new cinacalcet (Sensipar/Mimpara) treatment algorithm for secondary hyperparathyroidism. <em>Clin J Am Soc Nephrol.</em> 2008;3:36-45. </a>
						</p>
						<p class="ref10">
							10.
							<a href="javascript:openPDF('pdf/10_Qunibi AJKD 2008 (CARE-2)2004_1914-1926.pdf');">Qunibi WY, Hootkins RE, McDowell LL, et al. Treatment of hyperphosphatemia in hemodialysis patients: the Calcium Acetate Renagel Evaluation (CARE Study). <em>Kidney Int.</em> 2004;65:1914-1926.</a>
						</p>
						<p class="ref11">
							11.
							<a href="javascript:openPDF('pdf/11_Chertow KI 2002 (TTG) 245-252.pdf');">Chertow GM, Burke SK, Raggi P, for the Treat to Goal Working Group. Sevelamer attenuates the progression of coronary and aortic calcification in hemodialysis patients. <em>Kidney Int.</em> 2002;62:245-252. </a>
						</p>
						<p class="ref12">
							12.
							<a href="javascript:openPDF('pdf/12_Malberti ECHO ERA-EDTA poster 2008.pdf');">Malberti F, Saha H, Neyer U, et al. on behalf of the Pan-European ECHO Study Investigator Group. KDOQI™ target achievement is improved with cinacalcet (Mimpara<sup>®</sup>/Sensipar<sup>®</sup>) in clinical practice. Presented at: European Renal Association–European Dialysis and Transplantation Association (ERA-EDTA) XLV Congress; May 10-13, 2008; Stockholm, Sweden. Abstract MP411. </a>
						</p>
						<p class="ref13">
							13.
							<a href="javascript:openPDF('pdf/13_UrenaP-Nephrol Dial Transplant2009 2852-2859.pdf');">Ureña P, Jacobson SH, Zitt E, et al. Cinacalcet and achievement of the NKF/KDOQI™ recommended target values for bone and mineral metabolism in real-world clinical practice - the ECHO observational study. <em>Nephrol Dial Transplant.</em> 2009 Sep;24(9):2852-2859. </a>
						</p>
						<p class="ref14">
							14.
							<a href="javascript:openPDF('pdf/14_Goodman Sem Dial 2004 209-216.pdf');">Goodman WG. The consequences of uncontrolled secondary hyperparathyroidism and its treatment in chronic kidney disease. <em>Semin Dial.</em> 2004;17:209-216. </a>
						</p>
						<p class="ref15">
							15.
							<a href="javascript:openPDF('pdf/15_Raggi Advance NDT 2010.pdf');">Raggi P, Chertow G, Urena P, et al. The ADVANCE study: a randomized study to evaluate the effects of cinacalcet plus low-dose vitamin D on vascular calcification in patients on hemodialysis. Nephrol Dial Transplant. E-pub, 8 December 2010.</a>
						</p>
						<p class="ref16">
							16.
							<a href="javascript:openPDF('pdf/16_Hawley ASN 2010.pdf');">Hawley CM, Urena PA, Goodman WG, et al Effects of cinacalcet with low dose vitamin D sterols in hemodialysis patients with secondary hyperparathyroidism: results from the ADVANCE study. Presented at: American Society of Nephrology Renal Week; November 16-21, 2010; Denver, CO.</a>
						</p>
						<p class="ref17">
							17.
							<a href="javascript:openPDF('pdf/17_Block_KI 2010.pdf');">Block GA, Zaun D, Smits G, et al. Cinacalcet hydrochloride treatment significantly improves all-cause and cardiovascular survival in a large cohort of hemodialysis patients. Kidney Int. 2010; 78: 578 – 589; doi:10.1038/ki.2010.167. </a>
						</p>
						<p class="ref18">
							18.
							<a href="javascript:openPDF('pdf/18_Chertow_ClinJASN2007898-905.pdf');">Chertow GM, Pupim LB, Block GA, et al. Evaluation of cinacalcet therapy to lower cardiovascular events (EVOLVE): rationale and design overview. <em>Clin J Am Soc Nephrol.</em> 2007;2:898-905.</a>
						</p>
						<p class="ref19">
							19.
							<a href="javascript:openPDF('pdf/19_Schaefer Sensor.pdf');">Schaefer RM, Bover J, Dellanna F, et al. Efficacy of cinacalcet administered with the first meal after dialysis: the SENSOR Study. Clin Nephrol. 2008;70:126-134.</a>
						</p>
						<p class="ref20">
							20.
							<a href="javascript:openPDF('pdf/20_Block et al. 2004 NEJM.pdf');">Block G, Martin K, de Francisco A, et al. Cinacalcet for Secondary Hyperparathyroidism in Patiënts Receiving Hemodialysis. N Engl J Med. 2004; 350: 1516-1525.</a>
						</p>
						<p class="ref21">
							21.
							<a href="javascript:openPDF('pdf/21_Lindberg JASN 2005.pdf');">Lindberg J, Culleton B, Wong G, et al. Cinacalcet HCI, an Oral Calcimimetic Agent for the Treatment of Secondary Hyperparathyroidism in Hemodialysis and Peritoneal Dialysis, A Randomized, double-blind, multicenter study. J Am Soc Nephrol. 2005; 16: 800-807.</a>
						</p>
					</div>
					<div class="blur_area bottom"></div>
				</div>
			</li>
			<li class="pri slide slide5 i:slide5">
				<h2>SmPC</h2>
				<div class="ref_drag">
					<div class="ref"></div>
					<div class="blur_area bottom"></div>
				</div>
			</li>
			<li class="pri slide slide6 i:swipe">
				<ul>
					<li class="slide slide6_1 i:slide6_1"><h2>Introductie-Risico</h2></li>
					<li class="slide slide6_2 i:slide6_2"><h2>Introductie-Dialysepatianten</h2></li>
					<li class="slide slide6_3 i:slide6_3"><h2>Introductie-Vitamine D</h2></li>
					<li class="slide slide6_4 ready"><h2>Introductie-SHTP</h2></li>
					<li class="slide slide6_5 i:slide6_5"><h2>Introductie-welke strategie</h2></li>
					<li class="slide slide6_6 i:slide6_6"><h2>Introductie-choise</h2></li>
				</ul>
			</li>
			<li class="pri slide slide7 i:swipe">
				<ul>
					<li class="slide slide7_1 i:slide7_1"><h2>Biomarkers 1</h2></li>
					<li class="slide slide7_2 i:slide7_2"><h2>Biomarkers 2</h2></li>
				</ul>
			</li>
			<li class="pri slide slide8 i:swipe">
				<ul>
					<li class="slide slide8_1 i:slide8_1"><h2>Vasculaire Calcificatie 1</h2></li>
					<li class="slide slide8_3 i:slide8_1"><h2>Vasculaire Calcificatie 1</h2></li>
					<li class="slide slide8_2 i:slide8_2"><h2>Vasculaire Calcificatie 2</h2></li>
				</ul>
			</li>
			<li class="pri slide slide9 i:swipe">
				<ul>
					<li class="slide slide9_1 i:slide9_1"><h2>Klinische Complicaties 1</h2></li>
					<li class="slide slide9_2 i:slide9_2"><h2>Klinische Complicaties 2</h2></li>
					<li class="slide slide9_3 i:slide9_3"><h2>Klinische Complicaties 3</h2></li>
				</ul>
			</li>
			<li class="pri slide slide10 i:slide10"><h2>Evolve</h2></li>
			<li class="pri slide slide11 ready"><h2>Closing Page</h2></li>
		</ul>

	</div>

	<div id="footer" class="i:footer"></div>

</div>

</body>
</html>