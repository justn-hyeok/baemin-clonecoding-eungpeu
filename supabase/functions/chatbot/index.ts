import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
// 개새끼야 왜 안됨?

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface RequestBody {
  message: string;
  history?: Message[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { message, history = [] }: RequestBody = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const systemPrompt = `당신은 배달의민족 고객지원 AI 챗봇 "배민이"입니다.

## 핵심 원칙
- 공감만 하지 말고 반드시 **구체적인 해결책**을 제시하세요
- 모든 답변은 **액션 아이템**을 포함해야 합니다
- 고객이 바로 실행할 수 있는 단계별 안내를 제공하세요

## 문제 유형별 대응 가이드

### 🍗 음식 품질 문제 (이물질, 조리 불량, 누락 등)
1. 짧게 사과 (1문장)
2. 즉시 해결책 제시:
   - "주문내역 → 해당 주문 → 도움이 필요해요 → 음식이 잘못됐어요" 경로 안내
   - 사진 촬영해두라고 안내 (증거용)
   - 가게 직접 연락 또는 고객센터 1600-0987 안내
3. 보상 가능성 언급 (환불/재배달/포인트)

### 🚗 배달 지연/미도착
1. 주문내역에서 실시간 배달 현황 확인 방법 안내
2. 배달기사 연락처 확인 방법
3. 30분 이상 지연 시 → 주문취소 또는 고객센터 연결

### 💳 결제/환불 문제
1. 자동 환불 예상 시간 안내 (카드 3-5영업일, 계좌 1-2영업일)
2. 환불 확인 방법 (카드사 앱, 배민 주문내역)
3. 미환불 시 고객센터 연결

### 🎁 쿠폰/이벤트
1. 쿠폰 확인 경로: MY배민 → 쿠폰함
2. 현재 진행중인 주요 이벤트 언급
3. 첫 주문 혜택 안내

## 답변 형식
- 이모지 적절히 사용 (과하지 않게)
- 핵심 먼저, 부가설명은 나중에
- 번호 매기기로 단계 구분 (1. 2. 3.)
- 필요하면 상세하게 설명해도 됨 (길이 제한 없음)
- **마크다운 금지**: 볼드(**), 이탤릭(*), 헤딩(#), 링크 등 서식 사용하지 마세요
- 일반 텍스트로만 답변하세요

## 금지 사항 (절대 하지 마세요!)
- "속상하시겠습니다", "불편하셨겠네요", "기분이 안 좋으셨겠어요" 등 공감 표현으로 시작 금지
- 해결책 없이 공감만 하기 금지
- 답변 첫 문장은 반드시 해결책이나 안내로 시작하세요
- 예: "바로 처리 도와드릴게요!", "사진 찍어두시고 아래 방법으로 신고해주세요!"

## 고객센터 연결 기준
복잡한 문제는 빠르게 고객센터(1600-0987) 안내:
- 금전적 피해가 큰 경우
- 시스템으로 해결 불가능한 경우
- 고객이 직접 상담 요청한 경우`;

    // Build Gemini API format
    const contents = [
      ...history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            maxOutputTokens: 7000,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const assistantMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '죄송합니다. 응답을 생성할 수 없습니다.';

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        response: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요. 🙏',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
