import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const webhookData = await req.json();
    console.log('Received webhook data:', JSON.stringify(webhookData, null, 2));

    // 웹훅 데이터의 유효성 검사
    if (!webhookData.success || !webhookData.task_id || !webhookData.result_image) {
      console.error('Invalid webhook data:', JSON.stringify(webhookData, null, 2));
      return NextResponse.json({ 
        message: 'Invalid webhook data', 
        receivedData: webhookData 
      }, { status: 400 });
    }

    // 성공적인 응답 처리
    if (webhookData.success === 1) {
      console.log('Face swap task completed successfully');
      console.log('Task ID:', webhookData.task_id);
      console.log('Result Image URL:', webhookData.result_image);
      console.log('Type:', webhookData.type);

      // 여기에서 결과 이미지 URL을 데이터베이스에 저장하거나
      // 실시간 알림을 클라이언트에 보내는 등의 추가 작업을 수행할 수 있습니다.

      return NextResponse.json({ 
        message: 'Webhook processed successfully',
        taskId: webhookData.task_id,
        resultImageUrl: webhookData.result_image,
        type: webhookData.type
      }, { status: 200 });
    } else {
      // 실패한 응답 처리
      console.error('Face swap task failed');
      console.error('Task ID:', webhookData.task_id);
      console.error('Error details:', webhookData.error || 'No error details provided');

      return NextResponse.json({ 
        message: 'Face swap task failed',
        taskId: webhookData.task_id,
        error: webhookData.error || 'Unknown error'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ 
      message: 'Error processing webhook',
      error: error.message
    }, { status: 500 });
  }
}
