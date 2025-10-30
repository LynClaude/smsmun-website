'use client'

import { useState } from 'react'
import PageTransition from '@/components/PageTransition'
import { LeadershipCard } from '@/components/LeadershipCard'
import { useI18n } from '@/lib/i18n-context'

interface Member {
  position: string
  name: string
  contact: string
}

interface YearData {
  secretariat: Member[]
  advisors: Member[]
}

interface LeadershipData {
  [key: string]: YearData
}

export default function AlumniLeadershipPage() {
  const { messages } = useI18n()
  const [selectedYear, setSelectedYear] = useState('2024-2025')
  
  // 职位翻译映射函数
  const translatePosition = (position: string): string => {
    if (!messages.alumni.positions) return position
    
    const posMap: { [key: string]: string } = {
      '协会秘书长': messages.alumni.positions.association_secretary_general,
      '常务秘书长': messages.alumni.positions.executive_secretary_general,
      '学术事务部副秘书长': messages.alumni.positions.academic_affairs_deputy,
      '公共关系事务部副秘书长': messages.alumni.positions.public_relations_deputy,
      '行政关系事务部副秘书长': messages.alumni.positions.administrative_affairs_deputy,
      '技术关系事务部副秘书长': messages.alumni.positions.technical_affairs_deputy,
      '行政管理事务部副秘书长': messages.alumni.positions.administrative_affairs_deputy,
      '技术宣传事务部副秘书长': messages.alumni.positions.technical_affairs_deputy,
      '学术事务部高级顾问': messages.alumni.positions.academic_affairs_advisor,
      '公共关系事务部高级顾问': messages.alumni.positions.public_relations_advisor,
      '行政关系事务部高级顾问': messages.alumni.positions.administrative_affairs_advisor,
      '行政事务部高级顾问': messages.alumni.positions.administrative_affairs_advisor,
    }
    
    return posMap[position] || position
  }

  const years = [
    '2024-2025',
    '2023-2024',
    '2022-2023',
    '2021-2022',
    '2020-2021',
    '2019-2020',
    '2018-2019',
    '2017-2018',
    '2016-2017',
    '2015-2016',
    '2014-2015',
    '2013-2014',
    '2012-2013',
    '2011-2012',
    '2010-2011',
    '2009-2010',
    '2008-2009',
    '2007-2008',
    '2006-2007',
    '2005-2006',
  ]

  const leadershipData: LeadershipData = {
    '2024-2025': {
      secretariat: [
        { position: '协会秘书长', name: '甘楚涵', contact: '13631563505' },
        { position: '常务秘书长', name: '伍宣静', contact: '13829900066' },
        { position: '学术事务部副秘书长', name: '张亦驰', contact: '19925474242' },
        { position: '学术事务部副秘书长', name: '周张晗', contact: '13691916656' },
        { position: '学术事务部副秘书长', name: '黎启诚', contact: '14739916283' },
        { position: '公共关系事务部副秘书长', name: '庞棕雨', contact: '13411868050' },
        { position: '公共关系事务部副秘书长', name: '汤峤', contact: '13760284223' },
        { position: '行政关系事务部副秘书长', name: '李艺涵', contact: '13538278700' },
        { position: '技术关系事务部副秘书长', name: '王钰淇', contact: '15118021935' },
      ],
      advisors: [
        { position: '学术事务部高级顾问', name: '柳知好', contact: '19926542029' },
        { position: '学术事务部高级顾问', name: '林梓烨', contact: '13480661529' },
        { position: '学术事务部高级顾问', name: '刘楷姸', contact: '14774933963' },
        { position: '学术事务部高级顾问', name: '乔秋宸', contact: '18620390907' },
        { position: '公共关系事务部高级顾问', name: '林卓烨', contact: '13316832860' },
        { position: '行政关系事务部高级顾问', name: '姚羽宸', contact: '15013890406' },
      ],
    },
    '2023-2024': {
      secretariat: [
        { position: '协会秘书长', name: '汪熙宸', contact: '13430485110' },
        { position: '常务秘书长', name: '徐欣姸', contact: '13267238676' },
        { position: '学术事务部副秘书长', name: '欧阳蓝豆', contact: '188202048521' },
        { position: '学术事务部副秘书长', name: '聂卓远', contact: '18620390907' },
        { position: '公共关系事务部副秘书长', name: '朱楚嫣', contact: '15815571058' },
        { position: '公共关系事务部副秘书长', name: '官宸', contact: '18923883282' },
        { position: '行政管理事务部副秘书长', name: '罗雨杰', contact: '15712077161' },
        { position: '技术宣传事务部副秘书长', name: '曾雅淇', contact: '15989471606' },
        { position: '技术宣传事务部副秘书长', name: '郭法诺', contact: '13528720595' },
      ],
      advisors: [
        { position: '学术事务部高级顾问', name: '陆丽雅', contact: '18127082913' },
        { position: '学术事务部高级顾问', name: '熊邦凯', contact: '18681520858' },
        { position: '学术事务部高级顾问', name: '金溪言', contact: '13414135356' },
        { position: '行政事务部高级顾问', name: '陈熠轩', contact: '13613032322' },
        { position: '行政事务部高级顾问', name: '唐子奕', contact: '18126339644' },
      ],
    },
    '2022-2023': {
      secretariat: [
        { position: '协会秘书长', name: '邓筌心', contact: '13501571621' },
        { position: '常务秘书长', name: '李轶辰', contact: '18098904131' },
        { position: '学术事务部副秘书长', name: '陈烁宇', contact: '137602470531' },
        { position: '公共关系事务部副秘书长', name: '钟文畅', contact: '15112613183' },
        { position: '公共关系事务部副秘书长', name: '吕偌涵', contact: '14775965969' },
        { position: '行政管理事务部副秘书长', name: '魏琪臻', contact: '18098938989' },
        { position: '技术宣传事务部副秘书长', name: '刘羽琪', contact: '159153044286' },
      ],
      advisors: [
        { position: '学术事务部高级顾问', name: '赵宇轩', contact: '18682024821' },
        { position: '学术事务部高级顾问', name: '张语倢', contact: '14774936035' },
        { position: '公共关系事务部高级顾问', name: '许骞月', contact: '18344256961' },
        { position: '公共关系事务部高级顾问', name: '何俊睿', contact: '15814016822' },
        { position: '行政管理事务部高级顾问', name: '卫一凡', contact: '13418771644' },
        { position: '行政管理事务部高级顾问', name: '王海琳', contact: '13713979063' },
        { position: '技术宣传事务部高级顾问', name: '陈宇浩', contact: '18718569031' },
        { position: '技术宣传事务部高级顾问', name: '陈诗漫', contact: '17302668563' },
        { position: '技术宣传事务部高级顾问', name: '卓裕凯', contact: '13928492947' },
        { position: '技术宣传事务部高级顾问', name: '余锦萱', contact: '18802686114' },
        { position: '技术宣传事务部高级顾问', name: '陈晓晴', contact: '13430830148' },
      ],
    },
    '2021-2022': {
      secretariat: [
        { position: '协会秘书长', name: '李安之', contact: '13310856680' },
        { position: '常务秘书长', name: '许可臻', contact: '18680678549' },
        { position: '学术事务部副秘书长', name: '张赫楠', contact: '13500066979' },
        { position: '学术事务部副秘书长', name: '陈星润', contact: '13723445233' },
        { position: '学术事务部副秘书长', name: '郑卓雅', contact: '19928790748' },
        { position: '公共关系事务部副秘书长', name: '陈钟毓', contact: '13392864859' },
        { position: '行政管理事务部副秘书长', name: '郑家豪', contact: '14774853137' },
        { position: '技术宣传事务部副秘书长', name: '符慧子', contact: '18002527243' },
      ],
      advisors: [
        { position: '学术事务部高级顾问', name: '王玺', contact: '13430489972' },
        { position: '学术事务部高级顾问', name: '谢蕊希', contact: '13570816160' },
        { position: '公共关系事务部高级顾问', name: '刘欣怡', contact: '13686415316' },
        { position: '行政管理事务部高级顾问', name: '叶文骏', contact: '13684989336' },
        { position: '行政管理事务部高级顾问', name: '尹嘉妮', contact: '13825255839' },
        { position: '技术宣传事务部高级顾问', name: '花蓉', contact: '18028700809' },
        { position: '技术宣传事务部高级顾问', name: '黄俊然', contact: '13612912528' },
      ],
    },
    '2020-2021': {
      secretariat: [
        { position: '协会秘书长', name: '熊绍邵', contact: '13316953516' },
        { position: '常务秘书长', name: '马静怡', contact: '18820901911' },
        { position: '学术事务部副秘书长', name: '于诗暄', contact: '18902843124' },
        { position: '公共关系事务部副秘书长', name: '张俊莹', contact: '18025856621' },
        { position: '行政管理事务部副秘书长', name: '吴钰杰', contact: '13430748715' },
        { position: '技术宣传事务部副秘书长', name: '叶馨', contact: '13620926279' },
      ],
      advisors: []
    },
    '2019-2020': {
      secretariat: [
        { position: '协会秘书长', name: '彭咏梅', contact: '13922813950' },
        { position: '常务秘书长', name: '陈子意', contact: '18126295151' },
        { position: '学术事务部副秘书长', name: '丁琳真', contact: '13609619136' },
        { position: '行政管理事务部副秘书长', name: '肖继涵', contact: '118218809908' },
        { position: '公共关系事务部副秘书长', name: '江坤彤', contact: '15815549583' },
        { position: '公共关系事务部副秘书长', name: '魏雨熹', contact: '13612879225' },
        { position: '技术宣传事务部副秘书长', name: '汪科', contact: '13682621702' },
      ],
      advisors: []
    },
    '2018-2019': {
      secretariat: [
        { position: '协会秘书长', name: '阙俊洁', contact: '13715107060' },
        { position: '常务秘书长', name: '周可欣', contact: '15817337780' },
        { position: '学术事务部副秘书长', name: '何思哲', contact: '15889573659' },
        { position: '学术事务部副秘书长', name: '熊小语', contact: '13510258618' },
        { position: '公共关系事务部副秘书长', name: '马骏祺', contact: '13828756244' },
        { position: '行政管理事务部副秘书长', name: '邹励涵', contact: '13691874139' },
        { position: '技术宣传事务部副秘书长', name: '伍奕峰', contact: '13699780920' },
      ],
      advisors: []
    },
    '2017-2018': {
      secretariat: [
        { position: '协会秘书长', name: '廖宸婕', contact: '' },
        { position: '协会秘书长', name: '胡熙祥', contact: '' },
        { position: '学术总监', name: '王袁雨婷', contact: '' },
        { position: '学术事务副秘书长', name: '刘羽丰', contact: '' },
        { position: '学术事务副秘书长', name: '刘子沛', contact: '' },
        { position: '行政管理副秘书长', name: '秦玥', contact: '' },
        { position: '公共关系副秘书长', name: '程方舟', contact: '' },
        { position: '技术宣传副秘书长', name: '胡天瑞', contact: '' },
        { position: '赞助总监', name: '贺博', contact: '' },
        { position: '英文组组长', name: '高睿', contact: '' },
        { position: 'MPC组组长', name: '黄熙熹', contact: '' }
      ],
      advisors: []
    },
    '2016-2017': {
      secretariat: [
        { position: '协会秘书长', name: '陈晖瑶', contact: '' },
        { position: '协会秘书长', name: '王袁雨婷', contact: '' },
        { position: '学术总监', name: '邵卓涵', contact: '' },
        { position: '学术事务副秘书长', name: '闭钰', contact: '' },
        { position: '学术事务副秘书长', name: '廖泽威', contact: '' },
        { position: '行政管理副秘书长', name: '刘贞均', contact: '' },
        { position: '公共关系副秘书长', name: '蔡欣妮', contact: '' },
        { position: '技术宣传副秘书长', name: '张续', contact: '' },
        { position: '赞助总监', name: '乔小洋', contact: '' },
        { position: '赞助总监', name: '史琮琪', contact: '' }
      ],
      advisors: []
    },
    '2015-2016': {
      secretariat: [
        { position: '协会秘书长', name: '姚天希', contact: '' },
        { position: '协会秘书长', name: '邵卓涵', contact: '' },
        { position: '学术总监', name: '李泽远', contact: '' },
        { position: '学术事务副秘书长', name: '杨环', contact: '' },
        { position: '学术事务副秘书长', name: '黄海依', contact: '' },
        { position: '学术副总监', name: '周艺', contact: '' },
        { position: '行政管理副秘书长', name: '丁明语', contact: '' },
        { position: '公共关系副秘书长', name: '赵斯妤', contact: '' },
        { position: '技术宣传副秘书长', name: '李俊辰', contact: '' },
        { position: '赞助总监', name: '周雨萱', contact: '' }
      ],
      advisors: []
    },
    '2014-2015': {
      secretariat: [
        { position: '协会秘书长', name: '许雅', contact: '' },
        { position: '协会秘书长', name: '李泽远', contact: '' },
        { position: '学术总监', name: '潘星合', contact: '' },
        { position: '学术事务副秘书长', name: '吕宇澄', contact: '' },
        { position: '学术事务副秘书长', name: '吴泳瑱', contact: '' },
        { position: '学术事务部英文组组长', name: '汤浩明', contact: '' },
        { position: '行政管理副秘书长', name: '王逸宁', contact: '' },
        { position: '公共关系副秘书长', name: '陈悦琳', contact: '' },
        { position: '技术宣传副秘书长', name: '罗予希', contact: '' },
        { position: '赞助总监', name: '林可欢', contact: '' }
      ],
      advisors: []
    },
    '2013-2014': {
      secretariat: [
        { position: '协会秘书长', name: '谢凌', contact: '' },
        { position: '协会秘书长', name: '胡宇鹏', contact: '' },
        { position: '学术总监', name: '夏侯佐瀚', contact: '' },
        { position: '学术事务副秘书长', name: '冯昱善', contact: '' },
        { position: '学术事务副秘书长', name: '林伟长', contact: '' },
        { position: '行政管理副秘书长', name: '张一令', contact: '' },
        { position: '公共关系副秘书长', name: '徐伊钒', contact: '' },
        { position: '技术宣传副秘书长', name: '胡明玥', contact: '' }
      ],
      advisors: []
    },
    '2012-2013': {
      secretariat: [
        { position: '协会秘书长', name: '周苡宁', contact: '' },
        { position: '学术总监', name: '罗善文', contact: '' },
        { position: '学术事务副秘书长', name: '夏侯佐瀚', contact: '' },
        { position: '学术事务副秘书长', name: '陈亮', contact: '' },
        { position: '行政管理副秘书长', name: '廖锦怡', contact: '' },
        { position: '公共关系副秘书长', name: '郑欣', contact: '' },
        { position: '技术宣传副秘书长', name: '杨沛琦', contact: '' }
      ],
      advisors: []
    },
    '2011-2012': {
      secretariat: [
        { position: '协会秘书长', name: '周静月', contact: '' },
        { position: '学术总监', name: '刘俣豪', contact: '' }
      ],
      advisors: []
    },
    '2010-2011': {
      secretariat: [
        { position: '协会秘书长', name: '孔天柔', contact: '' }
      ],
      advisors: []
    },
    '2009-2010': {
      secretariat: [
        { position: '协会秘书长', name: '潘韵竹', contact: '' },
        { position: '行政事务副秘书长', name: '黄李鸣翠', contact: '' },
        { position: '公共事务副秘书长', name: '朱尚然', contact: '' },
        { position: '学术总监', name: '曹雨', contact: '' },
        { position: '学术总监', name: '罗广彦', contact: '' },
        { position: '财政总监', name: '陈文强', contact: '' },
        { position: '协调总监', name: '杜宇昊', contact: '' },
        { position: '精英资源司', name: '罗广彦', contact: '' },
        { position: '精英资源司', name: '邢福珩', contact: '' },
        { position: '内政事务司', name: '李惠康', contact: '' },
        { position: '内政事务司', name: '石潘瑾欣', contact: '' },
        { position: '公共关系司', name: '陈璐', contact: '' },
        { position: '公共关系司', name: '赵武汉', contact: '' },
        { position: '监督协调司', name: '刘竞佳', contact: '' },
        { position: '技术宣传司', name: '彭俊熙', contact: '' },
        { position: '技术宣传司', name: '曾洋洋', contact: '' }
      ],
      advisors: []
    },
    '2008-2009': {
      secretariat: [
        { position: '协会秘书长', name: '陈俊澎', contact: '' },
        { position: '协会秘书长', name: '柳恋桃', contact: '' },
        { position: '行政管理副秘书长', name: '郑伟杰', contact: '' },
        { position: '公共事务副秘书长', name: '金晶', contact: '' },
        { position: '公共关系总监', name: '柳恋桃', contact: '' },
        { position: '行政管理总监', name: '郑伟杰', contact: '' },
        { position: '学术总监', name: '李煜东', contact: '' },
        { position: '学术总监', name: '刘国威', contact: '' },
        { position: '艺术总监', name: '金晶', contact: '' },
        { position: '社团总监', name: '杨璇', contact: '' },
        { position: '公共关系司', name: '刘玮', contact: '' },
        { position: '行政信息司', name: '郑筝', contact: '' },
        { position: '精英资源司', name: '刘国威', contact: '' },
        { position: '内政事务司', name: '郑伟杰', contact: '' },
        { position: '技术资源司', name: '金晶', contact: '' }
      ],
      advisors: []
    },
    '2007-2008': {
      secretariat: [
        { position: '协会秘书长', name: '潘芳迪', contact: '' },
        { position: '协会秘书长', name: '陈奕霖', contact: '' },
        { position: '常务副秘书长', name: '万梦奇', contact: '' },
        { position: '公共关系总监', name: '金小异', contact: '' },
        { position: '公共关系司', name: '刘怿文', contact: '' },
        { position: '公共关系司', name: '刘新', contact: '' },
        { position: '行政管理司', name: '盛任之', contact: '' },
        { position: '行政管理司', name: '古威鹏', contact: '' },
        { position: '会议筹备司', name: '吴海成', contact: '' },
        { position: '会议筹备司', name: '张炜昊', contact: '' },
        { position: '会议筹备司', name: '陈恺丹', contact: '' },
        { position: '培训事务司', name: '任其然', contact: '' },
        { position: '社团负责人', name: '高文卿', contact: '' }
      ],
      advisors: [
        { position: '顾问', name: '莫一夫', contact: '' },
        { position: '顾问', name: '孔薇', contact: '' }
      ]
    },
    '2005-2007': {
      secretariat: [
        { position: '秘书长', name: '莫一夫', contact: '' },
        { position: '行政总监', name: '张演善', contact: '' },
        { position: '公共关系总监', name: '马斯晓', contact: '' },
        { position: '行政管理常务副秘书长', name: '杨泽华', contact: '' },
        { position: '公共关系常务副秘书长', name: '顾正澄', contact: '' },
        { position: '行政管理司司长', name: '陈奕霖', contact: '' },
        { position: '宣传事务司司长', name: '潘芳迪', contact: '' },
        { position: '对外联络司司长', name: '赵学思', contact: '' },
        { position: '议程规划处理事', name: '吴海成', contact: '' },
        { position: '申请事务处理事', name: '张炜昊', contact: '' }
      ],
      advisors: []
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧年份导航 */}
            <div className="md:w-64 space-y-2">
              <h2 className="text-xl font-bold mb-4">{messages.alumni.title}</h2>
              <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedYear === year
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧内容区域 */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-8">{selectedYear} {messages.alumni.leadership_members}</h2>
                
                {leadershipData[selectedYear] ? (
                  <>
                    {/* 秘书处 */}
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold mb-6">{messages.alumni.secretariat}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leadershipData[selectedYear].secretariat.map((member, index) => (
                          <LeadershipCard
                            key={index}
                            position={translatePosition(member.position)}
                            name={member.name}
                            contact={member.contact}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 高级顾问 */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6">{messages.alumni.advisors}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leadershipData[selectedYear].advisors.map((member, index) => (
                          <LeadershipCard
                            key={index}
                            position={translatePosition(member.position)}
                            name={member.name}
                            contact={member.contact}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    {messages.alumni.no_data}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
} 