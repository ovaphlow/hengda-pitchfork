package hengda.pitchfork

import com.google.gson.Gson
import io.grpc.stub.StreamObserver
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.sql.Connection

class CommonServiceImpl: CommonGrpc.CommonImplBase() {
    private val logger: Logger = LoggerFactory.getLogger(CommonServiceImpl::class.java);

    override fun listTrain(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data as cd where cd.id = t.master_id) as model
                from public.train as t
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun listDept(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data where id = cd.master_id) as dept0
                from public.common_data as cd
                where category = '部门'
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun listTeam(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *,
                    (select v from public.common_data where id = cd.master_id) as dept0
                from public.common_data as cd
                where category = '部门'
                    and k = '班组'
                order by id desc
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        } finally {
            conn!!.close()
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun save(req: CommonRequest, responseObserver: StreamObserver<CommonReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                insert into
                    public.train (master_id, name, remark)
                    values (?, ?, ?)
                returning id
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            val id = body.get("master_id").toString().toDouble().toInt()
            ps.setInt(1, id)
            ps.setString(2, body.get("name").toString())
            ps.setString(3, body.get("remark").toString())
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getMap(rs))
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }
}