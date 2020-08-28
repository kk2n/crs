module.exports = {
  'post /get/userInfo': {
    message: '获取用户信息成功!',
    result: '',
    data: {
      user: {
        userId: 900000554,
        userName: 'xuteng',
        userRealName: '徐腾（测试）',
        headUrl: 'http://static.yimifudao.com.cn/static-files/user_pics/2006231706286790.jpg',
        teacherType: 1,
        isMaturity: 0,
        subjectIds:
          '4267aa39-6ecb-40b7-8e10-7b309d022aec,5e75e6d1-7728-49b4-b829-7557df4805aa,77a1a4a2-cbc2-4339-9299-9a2ca614ce85,0f98848d-2f4d-4296-bd0b-66355a070c66,7a48f7c9-b741-40dc-bed4-8f7f8f276b46,c7241629-1ec4-4035-b04c-ef17f7832017,c7241629-1ec4-4035-b04c-ef17f7866666',
        erpSubjectIds: '1,2,3,4,5,7,8',
        docGradeIds:
          '524B0C1B-C5B0-49B2-8DDB-7DFF1C1245D2,D9C54AEA-5780-4110-A445-9B390BB2DECF,7B5B05F7-50FD-421A-AAEC-8528CCE28AE9,0A515426-D619-4AB9-BCA0-AE8EAEA13726,5F28CA2D-1B65-4602-AF9E-BE9224B362DC,5621e618-6a30-4488-bb63-8889475196f1,ff84aecc-2910-11e8-b467-0ed5f89f718b,6d8ff91f-22a4-4800-957d-11e84d39b788,7e5d9fa1-a422-49c6-be11-3489af6b81ea,c7241629-1ec4-4035-b04c-ef17f7866633,c7241629-1ec4-4035-b04c-ef17f7866644,c7241629-1ec4-4035-b04c-ef17f7866655,f33c0e29-17b9-473b-aa47-250d2d051981',
        docErpGradeIds: '110,120,130,140,150,160,170,210,220,230,310,320,330',
        docGradeNames: '一年级,二年级,三年级,四年级,五年级,六年级,小学奥数,七年级,八年级,九年级,高一,高二,高三',
        erpGradeIds: '120,130,140,150,160,170,210,220,230,320,330',
        subjectNames: '语文,数学,英语,政治,历史,物理,化学',
        gradeIds:
          'D9C54AEA-5780-4110-A445-9B390BB2DECF,7B5B05F7-50FD-421A-AAEC-8528CCE28AE9,0A515426-D619-4AB9-BCA0-AE8EAEA13726,5F28CA2D-1B65-4602-AF9E-BE9224B362DC,5621e618-6a30-4488-bb63-8889475196f1,ff84aecc-2910-11e8-b467-0ed5f89f718b,6d8ff91f-22a4-4800-957d-11e84d39b788,7e5d9fa1-a422-49c6-be11-3489af6b81ea,c7241629-1ec4-4035-b04c-ef17f7866633,c7241629-1ec4-4035-b04c-ef17f7866655,f33c0e29-17b9-473b-aa47-250d2d051981',
        gradeNames: '二年级,三年级,四年级,五年级,六年级,小学奥数,七年级,八年级,九年级,高二,高三',
        userSex: '男',
        roleIds: '201',
        roleNames: '学科老师',
        menuList: [
          { id: 211653, parentId: 211647, name: 'JX_我的学生_学科测评', url: '/student/kas' },
          { id: 211657, parentId: 211654, name: 'JX_个人中心_我的学生', url: '/user/student' },
          { id: 211660, parentId: 211654, name: 'JX_个人中心_讲义详情', url: '/user/lecturedetails' },
          { id: 211664, parentId: 211661, name: 'JX_学科测评_题库选题', url: '/kas/selecttest' },
          { id: 211988, parentId: 211630, name: 'JX_课程表_首页', url: '/course/index' },
          { id: 211634, parentId: 211632, name: 'JX_作业中心_编辑作业', url: '/work/editwork' },
          { id: 211637, parentId: 211632, name: 'JX_作业中心_批改作业', url: '/work/check' },
          { id: 211641, parentId: 211639, name: 'JX_资源中心_知识库', url: '/library/know' },
          { id: 211644, parentId: 211639, name: 'JX_资源中心_导入成功', url: '/library/newteach/teachstepfive' },
          { id: 211648, parentId: 211647, name: 'JX_我的学生_学生档案', url: '/student/info' },
          { id: 211651, parentId: 211647, name: 'JX_我的学生_错题本', url: '/student/error' },
          { id: 211655, parentId: 211654, name: 'JX_个人中心_我的订单', url: '/user/myorder' },
          { id: 211658, parentId: 211654, name: 'JX_个人中心_我的课程', url: '/user/courses' },
          { id: 211662, parentId: 211661, name: 'JX_学科测评_学科测评', url: '/kas/list' },
          { id: 211666, parentId: 211661, name: 'JX_学科测评_测评结果', url: '/kas/kasres' },
          { id: 211989, parentId: 211631, name: 'JX_备课中心_首页', url: '/prepare/index' },
          { id: 211635, parentId: 211632, name: 'JX_作业中心_新增作业', url: '/work/addwork' },
          { id: 211638, parentId: 211632, name: 'JX_作业中心_题库选题', url: '/work/selecttest' },
          { id: 211642, parentId: 211639, name: 'JX_资源中心_备课篮', url: '/library/prepare' },
          { id: 211645, parentId: 211639, name: 'JX_资源中心_讲义详情', url: '/library/details' },
          { id: 211649, parentId: 211647, name: 'JX_我的学生_课程规划', url: '/student/plan' },
          { id: 211652, parentId: 211647, name: 'JX_我的学生_收藏夹', url: '/student/collect' },
          { id: 211656, parentId: 211654, name: 'JX_个人中心_我的收藏', url: '/user/favorite' },
          { id: 211659, parentId: 211654, name: 'JX_个人中心_我的试卷', url: '/user/papers' },
          { id: 211663, parentId: 211661, name: 'JX_学科测评_试卷详情', url: '/kas/detail' },
          { id: 211668, parentId: 211661, name: 'JX_学科测评_测评记录', url: '/kas/kaslogs' },
          { id: 211990, parentId: 211647, name: 'JX_我的学生_首页', url: '/student/index' },
          { id: 211633, parentId: 211632, name: 'JX_作业中心_首页', url: '/work/course' },
          { id: 211636, parentId: 211632, name: 'JX_作业中心_作业详情', url: '/work/workdetail' },
          { id: 211640, parentId: 211639, name: 'JX_资源中心_题库', url: '/library/test' },
          { id: 211643, parentId: 211639, name: 'JX_资源中心_创建讲义', url: '/library/lessonPlan/add' },
          { id: 211646, parentId: 211639, name: 'JX_资源中心_讲义库', url: '/library/teach' },
          { id: 211650, parentId: 211647, name: 'JX_我的学生_课堂报告', url: '/student/report' }
        ],
        permissionList: [
          { name: 'JX_基础数据_根据id查询单个地区教材信息', url: '/base-data/AreaBook/get|' },
          { name: 'JX_基础数据_更新地区教材', url: '/base-data/AreaBook/update|' },
          { name: 'JX_基础数据_批量删除地区教材', url: '/base-data/AreaBook/delete|' },
          { name: 'JX_基础数据_添加地区教材', url: '/base-data/AreaBook/insert||/system/regiontextbook' },
          { name: 'JX_基础数据_分页条件查询地区教材列表', url: '/base-data/AreaBook/query||/system/regiontextbook' },
          {
            name: 'JX_基础数据_根据ID查询教材详情教材',
            url: '/base-data/book/get||/work/selecttest|/system/curmanage'
          },
          { name: 'JX_基础数据_修改教材', url: '/base-data/book/update||/system/curmanage' },
          { name: 'JX_基础数据_批量删除教材', url: '/base-data/book/delete||/system/curmanage' },
          { name: 'JX_基础数据_新增教材', url: '/base-data/book/insert||/system/curmanage' },
          {
            name: 'JX_基础数据_查询教材',
            url:
              '/base-data/book/query||/work/selecttest|/library/test|/library/test/new|/library/know/addknow|/kas/add|/system/curmanage|/system/plan'
          },
          { name: 'JX_基础数据_获取年级', url: '/base-data/book/getGrade||/system/regiontextbook' },
          { name: 'JX_基础数据_通过年级获取学科', url: '/base-data/book/getSubject||/system/regiontextbook' },
          {
            name: 'JX_基础数据_通过年级学科获取教材版本',
            url:
              '/base-data/book/getVersion||/work/selecttest|/library/test|/library/test/new|/library/know/addknow|/resources/handouts/create|/kas/add|/system/plan|/system/regiontextbook'
          },
          { name: 'JX_基础数据_批量根据ID查询教材详情教材', url: '/base-data/book/getList|' },
          { name: 'JX_基础数据_条件查询教材列表', url: '/base-data/book/queryBook|' },
          { name: 'JX_基础数据_查询章节详情', url: '/base-data/chapter/get|' },
          { name: 'JX_基础数据_修改章节', url: '/base-data/chapter/update||/system/curmanage' },
          { name: 'JX_基础数据_根据ID删除章节', url: '/base-data/chapter/delete||/system/curmanage' },
          { name: 'JX_基础数据_新增章节', url: '/base-data/chapter/insert||/system/curmanage' },
          { name: 'JX_基础数据_根据章节ID查询章节路径', url: '/base-data/chapter/getPath|' },
          { name: 'JX_基础数据_关联知识点', url: '/base-data/chapter/relationKnowledge||/system/curmanage' },
          {
            name: 'JX_基础数据_根据章节或专题ID查询子章节和专题ID',
            url: '/base-data/chapter/getChildByTopicIdOrchapterId|'
          },
          { name: 'JX_基础数据_根据章节id获取父章节相关信息', url: '/base-data/chapter/getParentChapterById|' },
          {
            name: 'JX_基础数据_根据父节点查询子节点',
            url: '/base-data/chapter/getChild||/work/selecttest|/resources/handouts/create|/system/curmanage'
          },
          {
            name: 'JX_基础数据_根据教材ID查询子节点',
            url:
              '/base-data/chapter/getChildByBookId||/work/selecttest|/library/test|/library/test/new|/library/know/addknow|/kas/add|/system/curmanage|/system/plan'
          },
          { name: 'JX_基础数据_章节交换位置', url: '/base-data/chapter/changeOrderNum|' },
          { name: 'JX_基础数据_基础服务的课程规划编辑', url: '/base-data/currPlan/update|' },
          { name: 'JX_基础数据_删除基础服务的课程规划', url: '/base-data/currPlan/delete|' },
          { name: 'JX_基础数据_基础服务的课程规划添加', url: '/base-data/currPlan/insert||/system/plan' },
          { name: 'JX_基础数据_获取基础服务的课程规划分页', url: '/base-data/currPlan/query||/system/plan' },
          { name: 'JX_基础数据_获取推基础服务的课程规划', url: '/base-data/currPlan/getList|' },
          { name: 'JX_基础数据_根据课程规划主键id查询教材信息', url: '/base-data/currPlan/queryBookByCurrPlanId|' },
          { name: 'JX_基础数据_课程规划排序', url: '/base-data/currPlan/reorder|' },
          { name: 'JX_基础数据_选择进度中获取规划内容', url: '/base-data/currPlan/obtainPace|' },
          { name: 'JX_基础数据_根据学生信息id查询出所有的规划信息', url: '/base-data/currPlan/obtainDesignInfo|' },
          { name: 'JX_基础数据_根据学生进度查询出教材', url: '/base-data/currPlan/obtainBook|' },
          { name: 'JX_基础数据_推送规则编辑', url: '/base-data/currPushRegulation/update||/system/pushrule' },
          { name: 'JX_基础数据_删除推送规则', url: '/base-data/currPushRegulation/delete||/system/pushrule' },
          {
            name: 'JX_基础数据_推送规则添加',
            url: '/base-data/currPushRegulation/insert||/system/plan|/system/pushrule'
          },
          {
            name: 'JX_基础数据_获取推送规则分页',
            url: '/base-data/currPushRegulation/query||/system/plan|/system/pushrule'
          },
          { name: 'JX_基础数据_获取推送规则详情', url: '/base-data/currPushRegulation/getList|' },
          { name: 'JX_基础数据_根据学校学生水平查询推送规则', url: '/base-data/currPushRegulation/selectRegulations|' },
          { name: 'JX_基础数据_根据id查询难度赋值', url: '/base-data/difficultAssignment/get|' },
          { name: 'JX_基础数据_更新难度赋值', url: '/base-data/difficultAssignment/update||/system/difficult' },
          { name: 'JX_基础数据_删除难度赋值', url: '/base-data/difficultAssignment/delete||/system/difficult' },
          { name: 'JX_基础数据_添加难度赋值', url: '/base-data/difficultAssignment/insert|' },
          { name: 'JX_基础数据_查询难度赋值', url: '/base-data/difficultAssignment/query||/system/difficult' },
          {
            name: 'JX_基础数据_根据地区id和知识点id的集合查询难度赋值',
            url: '/base-data/difficultAssignment/queryDifficult|'
          },
          { name: 'JX_基础数据_根据id查询学科能力', url: '/base-data/evaluationLearning/get|' },
          { name: 'JX_基础数据_更新学科能力', url: '/base-data/evaluationLearning/update||/system/subjectability' },
          { name: 'JX_基础数据_删除学科能力', url: '/base-data/evaluationLearning/delete||/system/subjectability' },
          { name: 'JX_基础数据_添加学科能力', url: '/base-data/evaluationLearning/insert||/system/subjectability' },
          { name: 'JX_基础数据_查询学科能力', url: '/base-data/evaluationLearning/query||/system/subjectability' },
          { name: 'JX_基础数据_批量查询学科能力', url: '/base-data/evaluationLearning/list|' },
          { name: 'JX_基础数据_根据学科查询学科能力', url: '/base-data/evaluationLearning/getEvalution|' },
          { name: 'JX_基础数据_模糊根据学科能力返回ids', url: '/base-data/evaluationLearning/getListEvalution|' },
          { name: 'JX_基础数据_查询单个学习建议信息', url: '/base-data/LearningAdvice/get|' },
          { name: 'JX_基础数据_更新学习建议', url: '/base-data/LearningAdvice/update||/system/studyadvise' },
          { name: 'JX_基础数据_删除学习建议', url: '/base-data/LearningAdvice/delete|' },
          { name: 'JX_基础数据_添加学习建议', url: '/base-data/LearningAdvice/insert||/system/studyadvise' },
          { name: 'JX_基础数据_条件查询所有学习建议', url: '/base-data/LearningAdvice/query||/system/studyadvise' },
          {
            name: 'JX_基础数据_根据ID查询讲义模板详情',
            url: '/base-data/lessonPlanTemplate/get||/resources/handouts/create|/system/teachtemp'
          },
          { name: 'JX_基础数据_修改讲义模板', url: '/base-data/lessonPlanTemplate/update||/system/teachtemp' },
          { name: 'JX_基础数据_删除讲义模板', url: '/base-data/lessonPlanTemplate/delete||/system/teachtemp' },
          { name: 'JX_基础数据_添加讲义模板', url: '/base-data/lessonPlanTemplate/insert||/system/teachtemp' },
          {
            name: 'JX_基础数据_根据学段和关键字查询讲义模板列表',
            url: '/base-data/lessonPlanTemplate/query||/resources/handouts/create|/system/teachtemp|/system/grade'
          },
          { name: 'JX_基础数据_根据ID查询测评详情', url: '/base-data/overallEvaluation/get|' },
          { name: 'JX_基础数据_修改总体评价，主键id必须传', url: '/base-data/overallEvaluation/update|' },
          { name: 'JX_基础数据_删除总体评价', url: '/base-data/overallEvaluation/delete|' },
          { name: 'JX_基础数据_添加总体评价', url: '/base-data/overallEvaluation/insert||/system/comment' },
          { name: 'JX_基础数据_查询测评列表', url: '/base-data/overallEvaluation/query||/system/comment' },
          { name: 'JX_基础数据_根据ID查询历年考试详情', url: '/base-data/overTheYearsExamsAssessment/get|' },
          {
            name: 'JX_基础数据_修改历年考试',
            url: '/base-data/overTheYearsExamsAssessment/update||/system/yearlyexam'
          },
          {
            name: 'JX_基础数据_删除历年考试',
            url: '/base-data/overTheYearsExamsAssessment/delete||/system/yearlyexam'
          },
          {
            name: 'JX_基础数据_添加历年考试',
            url: '/base-data/overTheYearsExamsAssessment/insert||/system/yearlyexam'
          },
          {
            name: 'JX_基础数据_查询历年考试列表',
            url: '/base-data/overTheYearsExamsAssessment/query||/system/yearlyexam'
          },
          { name: 'JX_基础数据_修改年级学段', url: '/base-data/phaseGrade/update|' },
          { name: 'JX_基础数据_删除年级学段', url: '/base-data/phaseGrade/delete||/system/grade' },
          { name: 'JX_基础数据_添加年级学段', url: '/base-data/phaseGrade/insert||/system/grade' },
          {
            name: 'JX_基础数据_根据年级获取学科',
            url:
              '/base-data/phaseGrade/obtainSubjectByGrade||/work/selecttest|/library/test|/kas/list|/kas/add|/system/curmanage|/system/plan|/system/regiontextbook'
          },
          {
            name: 'JX_基础数据_根据学科获取对应的年级',
            url: '/base-data/phaseGrade/obtainGradeBySubject||/library/know/addknow|/system/curmanage'
          },
          { name: 'JX_基础数据_根据学段获取年级', url: '/base-data/phaseGrade/obtainGradeByPhase|' },
          { name: 'JX_基础数据_获取所有的年级学段信息', url: '/base-data/phaseGrade/obtainAllByPhase||/system/grade' },
          { name: 'JX_基础数据_修改学段学科', url: '/base-data/phaseSubject/update||/system/phase' },
          { name: 'JX_基础数据_删除学段学科', url: '/base-data/phaseSubject/delete||/system/phase' },
          { name: 'JX_基础数据_添加学段学科', url: '/base-data/phaseSubject/insert||/system/phase' },
          {
            name: 'JX_基础数据_根据学段获取学科',
            url:
              '/base-data/phaseSubject/obtainSubjectByPhase||/work/selecttest|/system/topicmanage|/system/difficult|/system/yearlyexam|/system/studyadvise|/system/comment|system/mistakemanage|system/questiontype'
          },
          {
            name: 'JX_基础数据_展现所有的学段及学科的信息',
            url: '/base-data/phaseSubject/obtainAllPhase||/system/phase'
          },
          { name: 'JX_基础数据_根据id查询单个学科题型信息', url: '/base-data/questionType/get|' },
          { name: 'JX_基础数据_更新学科题型', url: '/base-data/questionType/update||system/questiontype' },
          { name: 'JX_基础数据_删除学科题型', url: '/base-data/questionType/delete||system/questiontype' },
          { name: 'JX_基础数据_添加学科题型', url: '/base-data/questionType/insert||system/questiontype' },
          { name: 'JX_基础数据_分页查询学科题型', url: '/base-data/questionType/query||system/questiontype' },
          { name: 'JX_基础数据_根据id批量获取信息', url: '/base-data/questionType/list|' },
          {
            name: 'JX_基础数据_获取题目类型',
            url: '/base-data/questionType/getQuestionType||/work/selecttest|/library/test|/kas/add'
          },
          { name: 'JX_基础数据_查询数据字典详情', url: '/base-data/sysCfgItem/get|' },
          { name: 'JX_基础数据_修改数据字典', url: '/base-data/sysCfgItem/simpleupdate|' },
          { name: 'JX_基础数据_修改数据字典(全部数据)', url: '/base-data/sysCfgItem/update|' },
          { name: 'JX_基础数据_删除数据字典', url: '/base-data/sysCfgItem/delete|' },
          { name: 'JX_基础数据_添加数据字典', url: '/base-data/sysCfgItem/simpleinsert|' },
          { name: 'JX_基础数据_添加数据字典(全部数据)', url: '/base-data/sysCfgItem/insert|' },
          { name: 'JX_基础数据_查询数据字典列表', url: '/base-data/sysCfgItem/query|' },
          { name: 'JX_基础数据_批量根据ID查询数据字典详情', url: '/base-data/sysCfgItem/getList|' },
          {
            name: 'JX_基础数据_交换字典表位置',
            url: '/base-data/sysCfgItem/changeOrderNum||/system/phase|/system/grade'
          },
          { name: 'JX_基础数据_根据编码查询数据字典详情', url: '/base-data/sysCfgItem/code|' },
          {
            name: 'JX_基础数据_根据配置code查询字典列表',
            url:
              '/base-data/sysCfgItem/cfgCode||/prepare|/work/selecttest|/library/test|/library/know|/kas/list|/kas/add|/system/topicmanage|/system/curmanage|/system/plan|/system/pushrule|/system/difficult|/system/yearlyexam|/system/regiontextbook|/system/studyadvise|/system/comment|/system/subjectability|system/mistakemanage|system/questiontype|/system/phase|/system/teachtemp|/system/grade'
          },
          { name: 'JX_基础数据_根据ItemValue查询Name', url: '/base-data/sysCfgItem/queryItemValue|' },
          {
            name: 'JX_基础数据_获取地区信息',
            url: '/base-data/sysCfgItem/area||/system/difficult|/system/yearlyexam|/system/regiontextbook'
          },
          { name: 'JX_基础数据_地区的模糊查询', url: '/base-data/sysCfgItem/getArea|' },
          { name: 'JX_基础数据_根据父ID查找子数据字典', url: '/base-data/sysCfgItem/parentid|' },
          { name: 'JX_基础数据_根据itemname模糊查询', url: '/base-data/sysCfgItem/getListByCfgCodeAndItemname|' },
          { name: 'JX_基础数据_修改试卷难度赋值', url: '/base-data/testPaperDif/update|' },
          { name: 'JX_基础数据_删除试卷难度赋值', url: '/base-data/testPaperDif/delete|' },
          { name: 'JX_基础数据_添加试卷难度赋值', url: '/base-data/testPaperDif/insert|' },
          { name: 'JX_基础数据_查询试卷难度赋值列表', url: '/base-data/testPaperDif/getByExamId|' },
          { name: 'JX_基础数据_根据试卷ID和题号删除难度赋值', url: '/base-data/testPaperDif/deleteByExamNumber|' },
          { name: 'JX_基础数据_根据专题id获取获取专题详情', url: '/base-data/topic/get||/system/topicmanage' },
          { name: 'JX_基础数据_修改专题节点', url: '/base-data/topic/update/node||/system/topicmanage' },
          { name: 'JX_基础数据_删除专题节点', url: '/base-data/topic/delete||/system/topicmanage' },
          { name: 'JX_基础数据_新增知识点', url: '/base-data/topic/insert/knowledge||/system/topicmanage' },
          { name: 'JX_基础数据_新增知识点节点', url: '/base-data/topic/insert/node||/system/topicmanage' },
          { name: 'JX_基础数据_新增知识点时根据学段获取学科', url: '/base-data/topic/getSubject||/system/topicmanage' },
          {
            name: 'JX_基础数据_根据父节点查询子节点知识点',
            url:
              '/base-data/topic/getChild||/work/selecttest|/library/test/new|/library/know/addknow|/resources/handouts/create|/system/difficult|/system/studyadvise'
          },
          { name: 'JX_基础数据_知识点交换位置', url: '/base-data/topic/changeOrderNum||/system/topicmanage' },
          { name: 'JX_基础数据_新增知识点时获取学段', url: '/base-data/topic/getPharse||/system/topicmanage' },
          {
            name: 'JX_基础数据_根据学科和学段查询知识点根节点',
            url:
              '/base-data/topic/first||/work/selecttest|/library/test/new|/library/know/addknow|/resources/handouts/create|/system/topicmanage|/system/difficult|/system/studyadvise'
          },
          { name: 'JX_基础数据_批量根据子查找父知识点ID', url: '/base-data/topic/getParentList||/system/topicmanage' },
          { name: 'JX_基础数据_根据知识点名称模糊查询ID', url: '/base-data/topic/queryIdByModule|' },
          { name: 'JX_基础数据_根据ID查询错因详情', url: '/base-data/wrongReasonSystem/get|' },
          { name: 'JX_基础数据_修改错因', url: '/base-data/wrongReasonSystem/update||system/mistakemanage' },
          { name: 'JX_基础数据_删除错因', url: '/base-data/wrongReasonSystem/delete||system/mistakemanage' },
          { name: 'JX_基础数据_添加错因', url: '/base-data/wrongReasonSystem/insert||system/mistakemanage' },
          { name: 'JX_基础数据_查询错因列表', url: '/base-data/wrongReasonSystem/query||system/mistakemanage' },
          { name: 'JX_基础数据_根据错因的id集合查询错因的集合', url: '/base-data/wrongReasonSystem/getList|' },
          { name: 'JX_基础数据_根据年级和学科查询错因', url: '/base-data/wrongReasonSystem/queryByGradeSubject|' },
          { name: 'JX_基础数据_年级罗列当前课程规划的内容相关联的所有学科', url: '/base-data/currPlan/getSubject|' },
          { name: 'JX_基础数据_罗列当前课程规划的内容相关联的所有年级', url: '/base-data/currPlan/getGrade|' },
          { name: 'JX_基础数据_获取学段年级学科信息', url: '/base-data/sysCfgItem/getPhaseGradeSubject|' },
          { name: 'JX_基础数据_添加课时规划', url: '/base-data/classTimePlan/insert|' },
          { name: 'JX_基础数据_分页查询课时规划列表', url: '/base-data/classTimePlan/query|' },
          { name: 'JX_基础数据_修改课时规划', url: '/base-data/classTimePlan/update|' },
          { name: 'JX_基础数据_更改课时规划次序', url: '/base-data/classTimePlan/updateOrderNum|' },
          { name: 'JX_基础数据_删除课时规划', url: '/base-data/classTimePlan/delete|' },
          {
            name: 'JX_erp_根据老师、年级、学科条件查询学生信息',
            url: '/business/getStudentsByTeacherAndGradeAndSubject|'
          },
          {
            name: 'JX_erp_查询老师教学年级信息列表',
            url: '/business/getTeachGradeList||/work|/work/addwork|/work/editwork|/student/kas|/user/papers'
          },
          {
            name: 'JX_erp_查询老师教学学科信息列表',
            url: '/business/getTeachSubjectList||/work|/work/addwork|/work/editwork|/student/kas|/user/papers'
          },
          { name: 'JX_erp_获取学生学习情况', url: '/business/getStudentLearningCondition|' },
          { name: 'JX_erp_查询课程时间段', url: '/business/getSchedules|' },
          { name: 'JX_erp_查询老师课程表', url: '/business/getLessons|' },
          { name: 'JX_erp_查询老师请假列表', url: '/business/getFrees|' },
          { name: 'JX_erp_查询老师学生列表', url: '/business/getStudents||/user/student' },
          { name: 'JX_erp_查询老师学生详情', url: '/business/getStudentDetail|' },
          { name: 'JX_erp_查询课程详情', url: '/business/getLessonDetail|' },
          { name: 'JX_erp_创建5次课程规划时排课', url: '/business/getLessonApplication|' },
          { name: 'JX_erp_获取订单', url: '/business/getAllOrder||/user/myorder' },
          { name: 'JX_erp_查询课程详情（详细）', url: '/business/table/getLessonDetail||/course' },
          { name: 'JX_erp_查询老师课程表（详细）', url: '/business/table/getLessons||/course|/user/courses' },
          {
            name: 'JX_erp_获取待处理工单数和最新一条工单',
            url:
              '/business/latestWorkOrderAndCount||/student/plan|/student/report|/student/collect|/user/papers|/library/test|/library/test/new|/library/know/addknow|/kas/list|kas/selecttest/add'
          },
          { name: 'JX_erp_设置消息为已读', url: '/business/NotificationStatusChange|' },
          {
            name: 'JX_erp_最新消息弹窗',
            url:
              '/business/notificationPopup||/student/plan|/student/report|/student/collect|/library/test|/library/know/addknow|/kas/list|kas/selecttest/add'
          },
          { name: 'JX_文件_office文件切割成图片', url: '/file/office/officeToImage|' },
          { name: 'JX_文件_获取token', url: '/stsController/getToken||/resources/handouts|/resources/handouts/create' },
          { name: 'JX_文件_获取上传后的地址', url: '/stsController/upLoad|' },
          { name: 'JX_文件_获取URL前缀', url: '/stsController/getURLPrefix|' },
          { name: 'JX_文件_更新配置文件', url: '/stsController/reloadPro|' },
          { name: 'JX_文件_获取所有的URL', url: '/stsController/getALLURL|' },
          { name: 'JX_课程规划_获取综合规划栏目', url: '/lesson-design/currcolumn/get|' },
          { name: 'JX_课程规划_编辑综合规划栏目', url: '/lesson-design/currcolumn/update|' },
          { name: 'JX_课程规划_删除综合规划栏目', url: '/lesson-design/currcolumn/delete|' },
          { name: 'JX_课程规划_添加综合规划栏目', url: '/lesson-design/currcolumn/insert|' },
          { name: 'JX_课程规划_条件查询综合课程规划栏目列表', url: '/lesson-design/currcolumn/get/list|' },
          { name: 'JX_课程规划_获取综合规划详情列表', url: '/lesson-design/currDesign/get|' },
          { name: 'JX_课程规划_查询H5页面综合课程规划详细信息', url: '/lesson-design/currDesign/query/lessondesign|' },
          {
            name: 'JX_课程规划_根据栏目主键id分页查询课程规划信息详情的列表',
            url: '/lesson-design/currDesign/getCurrDesignDetails|'
          },
          { name: 'JX_课程规划_获取所有综合规划', url: '/lesson-design/currDesign/getAll|' },
          {
            name: 'JX_课程规划_查询学生所有综合课程规划列表信息',
            url: '/lesson-design/currDesign/query/currdesign||/student/plan'
          },
          { name: 'JX_课程规划_获取综合课程规划详情', url: '/lesson-design/currDesignDetail/get|' },
          { name: 'JX_课程规划_编辑综合课程规划详情', url: '/lesson-design/currDesignDetail/update|' },
          { name: 'JX_课程规划_删除综合课程规划详情', url: '/lesson-design/currDesignDetail/delete|' },
          { name: 'JX_课程规划_添加综合课程规划详情', url: '/lesson-design/currDesignDetail/insert|' },
          { name: 'JX_课程规划_生成课程规划', url: '/lesson-design/currDesignDetail/generatePlan|' },
          { name: 'JX_课程规划_创建5次课程规划', url: '/lesson-design/fivelessondesign/insert|' },
          {
            name: 'JX_课程规划_上课前编辑单个课程规划信息',
            url: '/lesson-design/fivelessondesign/update/lessondesign|'
          },
          {
            name: 'JX_课程规划_上课后更新单个五次课程规划详情信息',
            url: '/lesson-design/fivelessondesign/update/lessondesigndetail|'
          },
          {
            name: 'JX_课程规划_查询单条五次课程规划信息',
            url: '/lesson-design/fivelessondesign/query/onefivelessondesign|'
          },
          {
            name: 'JX_课程规划_查询最新的五次课程规划信息',
            url: '/lesson-design/fivelessondesign/query/newfivelessondesign|'
          },
          {
            name: 'JX_课程规划_查询该学生全部五次课程规划信息',
            url: '/lesson-design/fivelessondesign/query/fivelessondesign|'
          },
          { name: 'JX_课程规划_添加综合课程规划教材学生教材', url: '/lesson-design/studentBook/insert|' },
          { name: 'JX_课程规划_查询教材详情信息列表', url: '/lesson-design/studentBook/query/recommend-books|' },
          { name: 'JX_课程规划_条件查询教材列表', url: '/lesson-design/studentBook/queryBook|' },
          { name: 'JX_课程规划_查询我的学生', url: '/lesson-design/student/query/student||/student/plan' },
          { name: 'JX_课程规划_添加完善学生信息', url: '/lesson-design/student/insert/studentinfo|' },
          { name: 'JX_课程规划_根据学生id、学科id查询对应学生信息', url: '/lesson-design/student/query/studentinfo|' },
          {
            name: 'JX_课程规划_根据学生id和学科id查询学生情况',
            url: '/lesson-design/student/query/studentconditon||/student/plan'
          },
          { name: 'JX_课程规划_根据学生信息id查询学生信息', url: '/lesson-design/student/query/studentinfo/detail|' },
          {
            name: 'JX_课程规划_根据综合课程规划主键查询栏目列表',
            url: '/lesson-design/currcolumn/get/listBycurrDesingId|'
          },
          {
            name: 'JX_课程规划_根据综合课程规划主键查询教材名称列表',
            url: '/lesson-design/studentBook/queryBookByCurrDesignId|'
          },
          { name: 'JX_课程规划_保存综合课程规划', url: '/lesson-design/currcolumn/save|' },
          { name: 'JX_课程规划_生成阶段报告', url: '/lesson-design/phase-report/save|' },
          {
            name: 'JX_课程规划_分页条件查询阶段报告列表',
            url: '/lesson-design/phase-report/query/list||/student/info|/student/stateReport/stateReport'
          },
          { name: 'JX_课程规划_查询阶段报告详情', url: '/lesson-design/phase-report/query/detail|' },
          { name: 'JX_讲义_修改自定义资源', url: '/lesson-plan/custom-resource/update|' },
          { name: 'JX_讲义_删除自定义资源', url: '/lesson-plan/custom-resource/delete|' },
          { name: 'JX_讲义_新增自定义资源', url: '/lesson-plan/custom-resource/insert|' },
          { name: 'JX_讲义_查询自定义资源', url: '/lesson-plan/custom-resource/query|' },
          { name: 'JX_讲义_批量查询自定义资源', url: '/lesson-plan/custom-resource/query/list|' },
          { name: 'JX_讲义_讲义详情查询', url: '/lesson-plan/query/detail||/resources/handouts/addresource/' },
          { name: 'JX_讲义_讲义库讲义查询', url: '/lesson-plan/query/lessons|' },
          { name: 'JX_讲义_根据讲义栏目ID查询栏目详情', url: '/lesson-plan/query/itemDtail|' },
          { name: 'JX_讲义_备课中心查询', url: '/lesson-plan/query/prepares||/prepare' },
          { name: 'JX_讲义_查询多讲义标签', url: '/lesson-plan/tag/queryTagList|' },
          { name: 'JX_讲义_查询讲义标签', url: '/lesson-plan/tag/queryTag|' },
          { name: 'JX_讲义_更新讲义标签', url: '/lesson-plan/tag/updateTag|' },
          { name: 'JX_讲义_添加讲义标签', url: '/lesson-plan/tag/addTag||/prepare' },
          { name: 'JX_讲义_查询课程报告', url: '/lesson-plan/lesson-report/queryByLessonId|' },
          { name: 'JX_讲义_查询课程的课堂报告列表', url: '/lesson-plan/lesson-report/queryLessonReports|' },
          {
            name: 'JX_讲义_条件查询老师课堂报告列表',
            url: '/lesson-plan/lesson-report/queryReportList||/student/report'
          },
          { name: 'JX_讲义_更新讲义（预备课）', url: '/lesson-plan/base/update|' },
          { name: 'JX_讲义_删除讲义（逻辑删除）', url: '/lesson-plan/base/delete||/prepare|/resources/handouts' },
          {
            name: 'JX_讲义_新增讲义',
            url: '/lesson-plan/base/insert||/resources/handouts|/resources/handouts/create|/resources/handouts/edit/'
          },
          { name: 'JX_讲义_关联讲义模板', url: '/lesson-plan/base/associate/template|' },
          {
            name: 'JX_讲义_更新讲义主题、关联讲义栏目中栏目资源及试题',
            url: '/lesson-plan/base/associate/template/items||/resources/handouts/addresource/'
          },
          { name: 'JX_讲义_新增课件类型讲义（上传课件）', url: '/lesson-plan/base/save/unstructured/common|' },
          { name: 'JX_讲义_新增音视频类型讲义（上传音视频）', url: '/lesson-plan/base/save/unstructured/multimedia|' },
          { name: 'JX_讲义_讲义导入课程', url: '/lesson-plan/base/lesson/import||/course|/prepare' },
          {
            name: 'JX_讲义_讲义批量导入课程',
            url: '/lesson-plan/base/lesson/import/batch||/resources/handouts/create|/library/lessonPlan/add/four/'
          },
          {
            name: 'JX_讲义_根据课程讲义id集合，讲义批量取消导入课程',
            url: '/lesson-plan/base/lesson/remove/ids||/course|/prepare'
          },
          { name: 'JX_讲义_根据讲义课程学生，讲义批量取消导入课程', url: '/lesson-plan/base/lesson/remove/condition|' },
          { name: 'JX_讲义_增减讲义使用次数', url: '/lesson-plan/base/update/usedCount|' },
          { name: 'JX_讲义_增减讲义收藏次数', url: '/lesson-plan/base/update/favoriteCount|' },
          { name: 'JX_讲义_课程ID查询课程讲义', url: '/lesson-plan/query/preparesByLessonIds|' },
          { name: 'JX_讲义_课程讲义id查询课程讲义详情', url: '/lesson-plan/query/getLessonPlanInfoDetailById|' },
          { name: 'JX_讲义_课程规划的基本类型推荐讲义', url: '/lesson-plan/query/recommend|' },
          { name: 'JX_讲义_讲义ID查询知识点ID', url: '/lesson-plan/query/getTopicsByPrePlanId|' },
          { name: 'JX_讲义_课程ID查询知识点和题目', url: '/lesson-plan/query/queryByLessonId|' },
          { name: 'JX_讲义_讲义预备课保存预览', url: '/lesson-plan/base/lesson/save||/resources/handouts' },
          { name: 'JX_讲义_修改是否为标准讲义', url: '/lesson-plan/base/changeStandard|' },
          { name: 'JX_讲义_讲义库讲义查询', url: '/lesson-plan/query/getLessons|' },
          { name: 'JX_题库_查询知识', url: '/question/knowledge/queryByIds|' },
          {
            name: 'JX_题库_新增知识或更新',
            url: '/question/knowledge/insertOrUpdate||/library/know|/library/know/addknow'
          },
          { name: 'JX_题库_分页查询知识', url: '/question/knowledge/query|' },
          { name: 'JX_题库_知识使用次数', url: '/question/knowledge/editUseCount|' },
          { name: 'JX_题库_知识收藏次数', url: '/question/knowledge/editCollectNumber|' },
          { name: 'JX_题库_题目使用次数添加', url: '/question/editUseCount|' },
          { name: 'JX_题库_收藏次数添加减少', url: '/question/editCollectNumber|' },
          {
            name: 'JX_题库_新增或更新试题',
            url: '/question/insertOrUpdate||/library/test|/library/test/new|kas/selecttest/add'
          },
          { name: 'JX_题库_题目纠错', url: '/question/questionErrorCorrection|' },
          { name: 'JX_题库_查询试题', url: '/question/queryByIds||/work/addwork|/work/editwork' },
          { name: 'JX_题库_查询试题', url: '/question/query||/work/selecttest' },
          { name: 'JX_题库_推荐题目', url: '/question/questionRecommend|' },
          {
            name: 'JX_作业_获取作业中心列表',
            url:
              '/service/lesson-work/student/getLessWorkStudent||/work|/work/editwork|/work/workdetail|/work/workdetail/'
          },
          { name: 'JX_作业_保存作业基础数据', url: '/service/lesson-work/student/saveLessonWork||/work/addwork' },
          {
            name: 'JX_作业_保存作业题目列表',
            url: '/service/lesson-work/student/question/saveLessWorkStudentQuestion||/work/addwork|/work/editwork'
          },
          { name: 'JX_作业_修改作业基础数据', url: '/service/lesson-work/student/updateLessonWork||/work/editwork' },
          {
            name: 'JX_作业_修改题目分数',
            url: '/service/lesson-work/student/question/updateLessonWorkStudentQuestion|'
          },
          { name: 'JX_作业_删除题目', url: '/service/lesson-work/student/question/delLessonWorkStudentQuestion|' },
          {
            name: 'JX_作业_发布作业',
            url: '/service/lesson-work/question/pushLessWorkStudent||/work/addwork|/work/editwork'
          },
          {
            name: 'JX_作业_获取学生作业题目列表',
            url: '/service/lesson-work/student/question/getLessWorkStudentQuestion||/work/editwork|/work/workdetail'
          },
          {
            name: 'JX_作业_获取错因列表和作业详情',
            url: '/service/lesson-work/question/getStudentQuestion||/work/check'
          },
          { name: 'JX_作业_更新学生试题', url: '/service/lesson-work/question/updateStudentQuestion||/work/check' },
          { name: 'JX_作业_更新状态', url: '/service/lesson-work/student/updateStatus||/work/check' },
          {
            name: 'JX_作业_获取老师课程',
            url: '/service/lesson-work/question/getLessons||/work/addwork|/work/editwork'
          },
          { name: 'JX_测评_发布测评--测评分页列表', url: '/assessment/getAllAssessment||/user/papers|/kas/list' },
          { name: 'JX_测评_测评分页列表--题目分页列表', url: '/assessment/question/getAssessmentQuestion|' },
          { name: 'JX_测评_测评报告列表', url: '/assessment/info/getAssessmentInfoState|' },
          { name: 'JX_测评_查询学科测评列表', url: '/assessment/info/getStudentAssessmentInfo||/student/kas' },
          { name: 'JX_测评_PC获取测评记录', url: '/assessment/info/getPCAssessmentList|' },
          { name: 'JX_测评_Model获取测评信息', url: '/assessment/info/getModelAssessmentList|' },
          { name: 'JX_测评_学生测评结果', url: '/assessment/answer/getStudentAnswer|' },
          { name: 'JX_收藏夹_分页条件查找收藏夹列表', url: '/favorite/query||/student/collect|/user/favorite' },
          { name: 'JX_收藏夹_收藏试题', url: '/favorite/insert/question||/work/selecttest' },
          { name: 'JX_收藏夹_收藏讲义', url: '/favorite/insert/lessonplan||/prepare' },
          { name: 'JX_收藏夹_收藏作业', url: '/favorite/insert/lessonwork||/work' },
          { name: 'JX_收藏夹_收藏知识资源', url: '/favorite/insert/knowledge|' },
          {
            name: 'JX_收藏夹_取消收藏',
            url: '/favorite/delete/favorite||/prepare|/work|/work/selecttest|/user/favorite'
          },
          {
            name: 'JX_收藏夹_根据课程id和学生id批量查询课程报告',
            url: '/favorite/class-persentation/getByLessonIdAndStudentId|'
          },
          { name: 'JX_收藏夹_分页条件查询错题本列表', url: '/favorite/wrong-question-book/query||/student/error' },
          { name: 'JX_收藏夹_查询错题本试题详情', url: '/favorite/wrong-question-book/queryQuestionDetail|' },
          { name: 'JX_收藏夹_查询收藏夹试题详情', url: '/favorite/queryQuestionDetail|' },
          { name: 'JX_学习轨迹_知识树点亮图谱', url: '/learning-path/tree/map|' },
          { name: 'JX_学习轨迹_获取学习轨迹', url: '/learning-path/contrail/getcontrails|' },
          { name: 'JX_收藏夹_过滤已收藏数据', url: '/favorite/valudate/favorite|' },
          { name: 'JX_基础数据_课程规划批量导入', url: '/base-data/currPlan/addBatch|' },
          { name: 'JX_测评_单一测评查询', url: '/assessment/selectOneAssessment|' },
          { name: 'JX_课程规划_查询存在阶段报告的学科信息列表', url: '/lesson-design/phase-report/query/subject|' },
          { name: 'JX_题库_查询题目历史使用记录', url: '/question/queryQuestionUseRecord|' },
          { name: 'JX_基础数据_查询是否包含试听课模板', url: '/base-data/lessonPlanTemplate/queryTestLesson|' },
          { name: 'JX_课程规划_查询综合课程规划详情', url: '/lesson-design/currDesign/getCurrDesignDetail|' },
          { name: 'JX_课程规划_条件查询教材列表', url: '/lesson-design/studentBook/queryBook|' },
          {
            name: 'JX_课程规划_添加学生教材生成课程规划',
            url: '/lesson-design/studentBook/insertBookAndResponseCurrDesign|'
          },
          { name: 'JX_课程规划_保存综合课程规划', url: '/lesson-design/currDesign/insertCurrDesign|' },
          { name: 'JX_讲义_讲义导入课程（指定老师）', url: '/lesson-plan/base/lesson/teacher/import|' },
          { name: 'JX_基础数据_根据教材id查询所有章节信息列表', url: '/base-data/chapter/getChapterByBookId|' },
          { name: 'JX_讲义_讲义导入课程（指定老师）', url: '/lesson-plan/base/lesson/teacher/import|' },
          { name: 'JX_题库_新增/更新多媒体资源', url: '/question/mediaResource/insertOrUpdate|' },
          { name: 'JX_题库_分页多媒体资源', url: '/question/mediaResource/query|' },
          { name: 'JX_题库_多媒体资源查询', url: '/question/mediaResource/queryById|' },
          { name: 'JX_题库_查询审核详情', url: '/question/auditResource/queryById|' },
          { name: 'JX_收藏_多媒体资源收藏', url: '/favorite/insert/media|' },
          { name: 'JX_讲义_多媒体批量导入课程', url: '/lesson-plan/base/lesson/import/media/batch|' }
        ],
        gradeAndSubjectList: [{ gradeId: '-1', gradeName: null, subjectId: '-1' }],
        teachBaseInfos: [],
        gradeGroup: [
          { itemId: 'D9C54AEA-5780-4110-A445-9B390BB2DECF', itemName: '二年级' },
          { itemId: '7B5B05F7-50FD-421A-AAEC-8528CCE28AE9', itemName: '三年级' },
          { itemId: '0A515426-D619-4AB9-BCA0-AE8EAEA13726', itemName: '四年级' },
          { itemId: '5F28CA2D-1B65-4602-AF9E-BE9224B362DC', itemName: '五年级' },
          { itemId: '5621e618-6a30-4488-bb63-8889475196f1', itemName: '六年级' },
          { itemId: 'ff84aecc-2910-11e8-b467-0ed5f89f718b', itemName: '小学奥数' },
          { itemId: '6d8ff91f-22a4-4800-957d-11e84d39b788', itemName: '七年级' },
          { itemId: '7e5d9fa1-a422-49c6-be11-3489af6b81ea', itemName: '八年级' },
          { itemId: 'c7241629-1ec4-4035-b04c-ef17f7866633', itemName: '九年级' },
          { itemId: 'c7241629-1ec4-4035-b04c-ef17f7866655', itemName: '高二' },
          { itemId: 'f33c0e29-17b9-473b-aa47-250d2d051981', itemName: '高三' }
        ],
        subjectGroup: [
          { itemId: '4267aa39-6ecb-40b7-8e10-7b309d022aec', itemName: '语文' },
          { itemId: '5e75e6d1-7728-49b4-b829-7557df4805aa', itemName: '数学' },
          { itemId: '77a1a4a2-cbc2-4339-9299-9a2ca614ce85', itemName: '英语' },
          { itemId: '0f98848d-2f4d-4296-bd0b-66355a070c66', itemName: '政治' },
          { itemId: '7a48f7c9-b741-40dc-bed4-8f7f8f276b46', itemName: '历史' },
          { itemId: 'c7241629-1ec4-4035-b04c-ef17f7832017', itemName: '物理' },
          { itemId: 'c7241629-1ec4-4035-b04c-ef17f7866666', itemName: '化学' }
        ]
      }
    },
    code: 0,
    success: false
  },
  'post /service/lesson-work/student/getLessWorkStudent': {
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 208,
      list: [
        {
          id: 153869,
          lessonworkname: '测试发布作业点点滴滴',
          lessonid: 2634064,
          studentid: 349861,
          studentname: '客户五验证',
          subjectid: '77a1a4a2-cbc2-4339-9299-9a2ca614ce85',
          gradeid: '6d8ff91f-22a4-4800-957d-11e84d39b788',
          gradeName: '三年级',
          subjectName: '语文',
          lessonstarttime: 1594367400000,
          lessonendtime: 1594377000000,
          lessonworkstatus: 1,
          description: null,
          teacherid: 900000554,
          createTime: 1594898928000,
          updateTime: 1594898928000,
          createName: '徐腾（测试）',
          scorecount: 22.0,
          favorite: false
        }
      ]
    },
    code: 0,
    success: true
  },
  'post /service/lesson-work/student/delLessonWork': {
    code: 0,
    success: true
  },
  'post /stsController/getToken': {
    message: null,
    result: 'success',
    data: {
      id: null,
      keyId: 'STS.NV7DYB2kFfZru9irmWnUJB5tm',
      secret: '4gDs6b8u3yhk8t9e8eaALhM1okxwnWQbDceoF4Nf8cuH',
      token:
        'CAIS+gF1q6Ft5B2yfSjIr5WCD+P237Rn0ZiZdx/Ylm0CYtpmrfDfjzz2IH1IeHJoA+8Zsf8+nmxZ7vYYlqAiE8cdHRSZMJcoLU+EJtbnMeT7oMWQweEurv/MQBqyaXPS2MvVfJ+OLrf0ceusbFbpjzJ6xaCAGxypQ12iN+/m6/Ngdc9FHHPPD1x8CcxROxFppeIDKHLVLozNCBPxhXfKB0ca0WgVy0EHsPThkpfGsUWD1wKkk7BK9r6ceMb0M5NeW75kSMqw0eBMca7M7TVd8RAi9t0t0fAYom+d4Y7CWAgLv0TeY7DOlN9uJQhpe6U9ALVeq/zxhWb3Am0AG0ScGoABPwTwWVnidy01xlJJIvwU0IEsNChO42PzXLJ7eJiUFVHpBYWWQ5c0zeyrPJRmQvNiHyyp4IIwqj7AITrYQ86LdgwLeEd0ONTh6LVaE6o7yMoAzeJDRs9FCzvBlruRxVT343YLX32xgLqRbSDqtFVexGFe9yUJqFE29MrILOOUXX4=',
      endpion: 'oss-cn-hangzhou.aliyuncs.com',
      bucketName: 'tikutupian',
      prefix: 'sit01',
      userid: 900000554,
      createDate: 1597052021580,
      provider: 'OSS'
    },
    code: 0,
    success: true
  },
  'get /erp/homework/gradeList': {
    code: 0,
    data: [
      {
        gradeId: 1,
        gradeName: '数据'
      }
    ]
  },
  'get /erp/homework/subjectList': {
    code: 0,
    data: [
      {
        subjectId: 1,
        subjectName: '数据'
      }
    ]
  },
  'post /erp/homework/querySTU': {
    code: 0,
    data: [
      {
        clientId: 1,
        clientName: '数据'
      }
    ]
  },
  'post /erp/homework/queryLessons': {
    code: 0,
    data: [
      {
        lessonId: 1,
        lessonName: '数据'
      }
    ]
  },
  'post /erp/homework/getDocsByLesson': {
    code: 0,
    data: [
      {
        fileName: 'asdfafsdfq.jpg',
        docName: 'asdfafsdfq.jpg',
        fileUrl:
          '//tikutupian.oss-cn-hangzhou.aliyuncs.com/ptkjy/JX_System/lessonPlanOld/2020-7-30/dc55998f-d4aa-4b68-8d10-645d155194bd/818c8d79-48f4-477e-9f85-aa5739634f9e.png',
        page: 1
      },
      {
        fileName: 'aq.jpg',
        docName: 'asdfafsdfq.jpg',
        fileUrl: 'img2.jpg',
        page: 1
      },
      {
        fileName: 'qw.jpg',
        docName: 'asdfafsdfq.jpg',
        fileUrl: 'img3.jpg',
        page: 1
      },
      {
        fileName: 'qwasd.jpg',
        docName: 'asdfafsdfq.jpg',
        fileUrl: 'img4.jpg',
        page: 1
      },
      {
        fileName: 'asdasda.jpg',
        docName: 'asdfafsdfq.jpg',
        fileUrl: 'img5.jpg',
        page: 1
      }
    ]
  },
  'post /erp/homework/delHomework': {
    code: 0,
    data: [
      {
        lessonId: 1,
        lessonName: '数据'
      }
    ]
  },
  'post /erp/homework/addHomework': {
    code: 0,
    data: null
  },
  'post /erp/homework/editHomework': {
    code: 0,
    data: null
  },
  'get /erp/homework/homeworkOpenStatus': { message: null, result: 'success', data: 1, code: 0, success: true },
  'post /erp/homework/queryHomework': {
    code: 0,
    data: {
      lessonDate: '2012-02-23',
      doneOn: '2012-02-23',
      clientName: '学生姓名',
      lessonName: '课程',
      homeworkName: '作业名称',
      content: '老师留言',
      lessonFid: '11',
      homeworkId: '11',
      teacherFid: 900000554,
      status: 0,
      attachfiles: [
        {
          id: 1,
          attachmentType: 'PDF',
          attachmentName: '文件名称',
          attachmentUrl: '文件url'
        }
      ],
      teaAttachfiles: {
        content: 'asdasd',
        files: [
          {
            attachmentId: 1,
            attachmentType: 'PFD',
            attachmentName: 'ASDFASDF.pdf',
            attachmentUrl:
              'http://tikutupian.oss-cn-hangzhou.aliyuncs.com/ptkjy/JX_System/lessonPlanOld/2020-7-30/dc55998f-d4aa-4b68-8d10-645d155194bd/818c8d79-48f4-477e-9f85-aa5739634f9e.png'
          }
        ]
      },
      stuAttachType: 1,
      stuAttachfiles: [
        {
          content: 'ad',
          createOn: '2012-02-23',
          files: [
            {
              attachmentId: 1,
              attachmentType: 'PFD',
              attachmentName: 'ASDFASDF.pdf',
              attachmentUrl: '//sit01-static.yimifudao.com/static-files/lesson_docs/2020/8/12/1597202959548_55071.jpg'
            }
          ]
        }
      ],
      correctfiles: [
        {
          createOn: '2012-02-23',
          attachmentId: 1,
          attachmentType: 'PFD',
          attachmentName: 'ASDFASDF.pdf',
          attachmentUrl:
            '//tikutupian.oss-cn-hangzhou.aliyuncs.com/ptkjy/JX_System/lessonPlanOld/2020-7-30/dc55998f-d4aa-4b68-8d10-645d155194bd/818c8d79-48f4-477e-9f85-aa5739634f9e.png'
        },
        {
          createOn: '2012-02-23',
          attachmentId: 1,
          attachmentType: 'MP3',
          attachmentName: 'ASDFASDF.pdf',
          audioDuration: '20:22',
          attachmentUrl:
            '//tikutupian.oss-cn-hangzhou.aliyuncs.com/ptkjy/JX_System/lessonPlanOld/2020-7-30/dc55998f-d4aa-4b68-8d10-645d155194bd/818c8d79-48f4-477e-9f85-aa5739634f9e.png'
        },
        {
          createOn: '2012-02-23',
          attachmentId: 1,
          attachmentType: 'MP3',
          attachmentName: 'ASDFASDF.pdf',
          audioDuration: '30:22',
          attachmentUrl:
            '//tikutupian.oss-cn-hangzhou.aliyuncs.com/ptkjy/JX_System/lessonPlanOld/2020-7-30/dc55998f-d4aa-4b68-8d10-645d155194bd/818c8d79-48f4-477e-9f85-aa5739634f9e.png'
        }
      ]
    }
  },
  'post /erp/homework/teaCorrect': {
    code: 0,
    data: null
  },
  'post /erp/homework/homeworkList': {
    code: 0,
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 10,
      'list|11': [
        {
          'homeworkId|+1': 1,
          homeworkName: '作业名称',
          'status|1': [0, 1, 2],
          statusDesc: 1,
          lessonFid: '@id',
          clientName: '学生姓名',
          subjectName: '学生姓名',
          gradeName: '学生姓名',
          lessonTime: '2020-09-23',
          createdOn: '2020-09-23',
          teacherName: '老师姓名',
          teacherFid: 900000554
        }
      ]
    }
  }
}
