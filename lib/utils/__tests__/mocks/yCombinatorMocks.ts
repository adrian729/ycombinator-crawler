export const yCombinatorHtmlMock = `
<html>
<body>
<table id="hnmain">
<tbody>
    <tr></tr>
    <tr id="pagespace"></tr>
    <tr>
        <td>
        <table>
        <tbody>
            <!-- tr athing: rank num, icon, titleline? -->
            <tr class="athing">
                <td class="title"><span class="rank">1.</span></td>
                <td class="votelinks"><center><a id="up_40799090" href="http://google.com/"><div class="votearrow" title="upvote"></div></a></center></td>
                <td class="title"><span class="titleline">
                    <a href="http://google.com/">Ghosts in the ROM (2012)</a>
                    <span class="sitebit comhead"> (<a href="http://google.com/"><span class="sitestr">nycresistor.com</span></a>)</span>
                </span></td>
            </tr>
            <!-- tr: empty td, points/user/article age/num comments -->
            <tr>
                <td colspan="2"></td>
                <td class="subtext"><span class="subline">
                    <span class="score" id="score_40799090">56 points</span> by <a href="http://google.com/" class="hnuser">gelstudios</a>
                    <span class="age" title="2024-06-26T12:15:46"><a href="http://google.com/">2 hours ago</a></span>
                    <span id="unv_40799090"></span> | <a href="http://google.com/">hide</a> | <a href="http://google.com/">6&nbsp;comments</a>
                </span></td>
            </tr>
            <!-- tr: spacer -->
            <tr class="spacer" style="height:5px"></tr>

            <!-- example without sitebit -->
            <tr class="athing" id="40799262">
                <td align="right" valign="top" class="title"><span class="rank">4.</span></td>
                <td valign="top" class="votelinks"><center><a id="up_40799262" href="http://google.com/"><div class="votearrow" title="upvote"></div></a></center></td>
                <td class="title"><span class="titleline">
                    <a href="http://google.com/">Show HN: Rubbrband – A hosted ComfyUI alternative for image generation</a>
                </span></td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td class="subtext"><span class="subline">
                    <span class="score" id="score_40799262">11 points</span> by <a href="http://google.com/" class="hnuser">jrmylee</a>
                    <span class="age" title="2024-06-26T12:33:50"><a href="http://google.com/">2 hours ago</a></span>
                    <span id="unv_40799262"></span> | <a href="http://google.com/">hide</a> | <a href="http://google.com/">5&nbsp;comments</a>
                </span></td>
            </tr>
            <tr class="spacer" style="height:5px"></tr>

            <!-- example with no comments -->
            <tr class="athing" id="40798222">
                <td align="right" valign="top" class="title"><span class="rank">110.</span></td><td valign="top" class="votelinks"><center><a id="up_40798222" href="vote?id=40798222&amp;how=up&amp;goto=news%3Fp%3D4"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><span class="titleline"><a href="https://wauland.de/en/news/2024/06/julian-assange-free/"> Short Title </a><span class="sitebit comhead"> (<a href="from?site=wauland.de"><span class="sitestr">wauland.de</span></a>)</span></span></td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td class="subtext"><span class="subline">
                    <span class="score" id="score_40798222">13 points</span> by <a href="user?id=Tomte" class="hnuser">Tomte</a>
                    <span class="age" title="2024-06-26T09:55:27"><a href="item?id=40798222">8 hours ago</a></span>
                    <span id="unv_40798222"></span> | <a href="hide?id=40798222&amp;goto=news%3Fp%3D4">hide</a> | <a href="item?id=40798222">discuss</a>
                </span></td>
            </tr>
            <tr class="spacer" style="height:5px"></tr>

            <tr class="morespace" style="height:10px"></tr>
            <tr><td colspan="2"></td><td class="title"><a href="?p=2" class="morelink" rel="next">More</a></td></tr>
        </tbody>
        </table>
        </td>
    </tr>
    <tr></tr>
</tbody>
</table>
</body>
</html>
`;
